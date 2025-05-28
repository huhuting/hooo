import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list materials records
 * @GET /materials/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.Materials.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(req.query.created_at){
			let val = req.query.created_at;
			queryFilters.push(DB.filterBy("materials.created_at", {[DB.op.gte]: val} ));
		}
		if(req.query.user_id){
			let vals = req.query.user_id
			queryFilters.push(DB.filterBy("materials.user_id", { [DB.op.in]: vals }))
		}
		if(req.query.tag_id){
			let vals = req.query.tag_id
			queryFilters.push(DB.filterBy("materials.tag_id", { [DB.op.in]: vals }))
		}
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'material_id', 'desc');
		query.attributes = DB.Materials.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 5;
		let result = await DB.Materials.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Materials record
 * @GET /materials/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['material_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Materials.viewFields();
		let record = await DB.Materials.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Materials record
 * @POST /materials/add
 */
router.post('/add/', 
	[
		body('title').not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('file_path').not().isEmpty(),
		body('category').not().isEmpty(),
		body('video').optional({nullable: true, checkFalsy: true}),
		body('created_at').not().isEmpty(),
		body('updated_at').not().isEmpty(),
		body('tag_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.file_path !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.file_path, 'file_path');
			modeldata.file_path = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video, 'video');
			modeldata.video = fileInfo.filepath;
		}
		
		//save Materials record
		let record = await DB.Materials.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['material_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Materials record for edit
 * @GET /materials/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['material_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Materials.editFields();
		let record = await DB.Materials.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Materials record
 * @POST /materials/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('title').optional({nullable: true}).not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('file_path').optional({nullable: true}).not().isEmpty(),
		body('category').optional({nullable: true}).not().isEmpty(),
		body('video').optional({nullable: true, checkFalsy: true}),
		body('tag_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.file_path !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.file_path, 'file_path');
			modeldata.file_path = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.video !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.video, 'video');
			modeldata.video = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['material_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Materials.editFields();
		let record = await DB.Materials.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Materials.update(modeldata, {where: where});
		record = await DB.Materials.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Materials record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /materials/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['user_id'] = req.user.user_id; //filter only current records
		}
		where['material_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Materials.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['material_id'], oldValues });
		});
		await DB.Materials.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
