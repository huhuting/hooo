import { Router } from 'express';
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import { body } from 'express-validator';
import config from '../config.js';
import utils from '../helpers/utils.js';
import uploader from '../helpers/uploader.js';
import mailer from '../helpers/mailer.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();


/**
 * Route to login user using credential
 * @POST /auth/login
 */
router.post('/login', [
	body('username').trim().not().isEmpty(),
	body('password').not().isEmpty(),
], validateFormData, async (req, res, next) => {
	try {
		let { username, password } = req.body;

		let user = await DB.Users.findOne({ where: { [DB.op.or]: { email: username, username: username } } });
		if (!user) {
			return res.unauthorized("Username or password not correct");
		}
		if (!utils.passwordVerify(password, user.password)) {
			return res.unauthorized("Username or password not correct");
		}
		// 获取用户认证信息
		let authType = username.includes('@') ? 'email' : 'username';  // 根据用户名是否包含“@”判断是邮箱还是用户名
		let authId = username;

		// 检查该认证方式是否已存在
		let authRecord = await DB.UserAuthentications.findOne({
			where: { user_id: user.user_id, auth_type: authType, auth_id: authId }
		});
		const date = new Date(); // 当前时间

		// 格式化为 MySQL 接受的格式：YYYY-MM-DD HH:MM:SS
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要+1
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		console.log(`用户登录时间: ${mysqlDateTime}`);

		// 如果认证信息不存在，插入新的认证记录
		if (!authRecord) {
			await DB.UserAuthentications.create({
				user_id: user.user_id,
				auth_type: authType,
				auth_id: authId,
				auth_data: JSON.stringify({ email: user.email, username: user.username }),  // 可以存储附加的认证数据
				login_time: mysqlDateTime // 记录登录时间
			});
		}
		if (authRecord) {
			await DB.UserAuthentications.update(

				{
					user_id: user.user_id,
					auth_type: authType,
					auth_id: authId,
					auth_data: JSON.stringify({ email: user.email, username: user.username }), // 存储附加认证数据
					login_time: mysqlDateTime // 更新登录时间
				}, {
				where: { ua_id: authRecord.ua_id } // 通过 ua_id 来确定更新哪条记录
			}
			);
		}


		req.writeToAuditLog({ recid: user['user_id'] });
		let loginData = await getUserLoginData(user);
		return res.ok(loginData);
	}
	catch (err) {
		return res.serverError(err);
	}
});


/**
 * Route to register new user
 * @POST /auth/register
 */
router.post('/register',
	[
		body('username').not().isEmpty(),
		body('email').not().isEmpty().isEmail(),
		body('password').not().isEmpty(),
		body('confirm_password', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
		body('usertele').optional({ nullable: true, checkFalsy: true }),
		body('photo').not().isEmpty(),
		body('is_teacher').optional({ nullable: true, checkFalsy: true }).isNumeric(),
	], validateFormData
	, async function (req, res) {
		try {
			let modeldata = req.getValidFormData();
			modeldata.password = utils.passwordHash(modeldata.password);

			// set default role for user
			const roleId = await DB.Roles.findValue('role_id', { role_name: 'Admin' });
			modeldata['user_role_id'] = roleId;

			// check if username already exist.
			let usernameCount = await DB.Users.count({ where: { 'username': modeldata.username } });
			if (usernameCount > 0) {
				return res.badRequest(`${modeldata.username} already exist.`);
			}

			// check if email already exist.
			let emailCount = await DB.Users.count({ where: { 'email': modeldata.email } });
			if (emailCount > 0) {
				return res.badRequest(`${modeldata.email} already exist.`);
			}

			// move uploaded file from temp directory to destination directory
			if (modeldata.photo !== undefined) {
				const fileInfo = uploader.moveUploadedFiles(modeldata.photo, 'photo');
				modeldata.photo = fileInfo.filepath;
			}

			const record = await DB.Users.create(modeldata);
			const user = record;
			const recid = record['user_id'];
			const newValues = JSON.stringify(record);
			req.writeToAuditLog({ recid, oldValues: null, newValues });

			let loginData = await getUserLoginData(user);
			return res.ok(loginData);
		}
		catch (err) {
			return res.serverError(err);
		}
	});







/**
 * Route to send password reset link to user email
 * @POST /auth/forgotpassword
 */
router.post('/forgotpassword', [
	body('email').not().isEmpty().isEmail(),
], validateFormData, async (req, res) => {
	try {
		const modeldata = req.getValidFormData();
		const email = modeldata.email;
		const user = await DB.Users.findOne({ where: { 'email': email } });
		if (!user) {
			return res.notFound("Email not registered");
		}
		await sendPasswordResetLink(user);
		req.writeToAuditLog({ recid: user['user_id'] });

		return res.ok("We have emailed your password reset link!");
	}
	catch (err) {
		return res.serverError(err);
	}
});


/**
 * Route to reset user password
 * @POST /auth/resetpassword
 */
router.post('/resetpassword', [
	body('password').not().isEmpty().custom((val, { req, loc, path }) => {
		if (val !== req.body.confirm_password) {
			throw new Error("Passwords confirmation does not match");
		} else {
			return val;
		}
	}),
], validateFormData, async (req, res) => {
	try {
		const token = req.body.token;
		const userid = getUserIDFromJwt(token);
		const password = req.body.password;
		const where = { user_id: userid }
		const record = await DB.Users.findOne({ where: where });
		if (!record) {
			return res.notFound("User not found");
		}
		const newPassword = utils.passwordHash(password);
		const modeldata = { password: newPassword }
		await DB.Users.update(modeldata, { where: where });
		req.writeToAuditLog({ recid: user['user_id'] });

		return res.ok("Password changed");
	}
	catch (err) {
		return res.serverError(err);
	}
});


/**
 * Send password reset link to user email 
*/
async function sendPasswordResetLink(user) {
	let token = generateUserToken(user);
	let resetlink = `${config.app.frontendUrl}/#/index/resetpassword?token=${token}`;
	let username = user.username;
	let email = user.email;
	let mailtitle = 'Password Reset';


	let viewData = { username, email, resetlink, config };
	let mailbody = await ejs.renderFile("views/pages/index/password_reset_email_template.ejs", viewData);

	let mailResult = await mailer.sendMail(email, mailtitle, mailbody);
	if (!mailResult.messageId) {
		throw new Error(mailResult.error);
	}
	return true;
}


/**
 * Return user login data
 * generate a signed jwt for the user
 * @param {object} user - current user
 */
async function getUserLoginData(user) {
	const expiresIn = config.auth.jwtDuration + 'm' //in minutes;
	const userid = user.user_id;
	const token = jwt.sign({ sub: userid }, config.auth.apiTokenSecret, { expiresIn });
	return { token }; //return user object and token
}


/**
 * Generate user auth token
 * @param {object} user - current user
 */
function generateUserToken(user) {
	const expiresIn = '10m' //in minutes;
	const userid = user.user_id;
	const token = jwt.sign({ sub: userid }, config.auth.userTokenSecret, { expiresIn });
	return token;
}


/**
 * Get userid from jwt token
 * @param {string} token
 */
function getUserIDFromJwt(token) {
	try {
		let decoded = jwt.verify(token, config.auth.userTokenSecret);
		return decoded.sub
	}
	catch (err) {
		throw new Error(err);
	}
}
export default router;
