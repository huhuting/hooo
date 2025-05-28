import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list replyreply records
 * @GET /replyreply/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ReplyReply.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'replys_id', 'desc');
		query.attributes = DB.ReplyReply.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ReplyReply.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ReplyReply record
 * @GET /replyreply/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['replys_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReplyReply.viewFields();
		let record = await DB.ReplyReply.findOne(query);
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
 * Route to insert ReplyReply record
 * @POST /replyreply/add
 */
router.post('/add/', 
	[
		body('reply_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('replay_content').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
		//save ReplyReply record
		let record = await DB.ReplyReply.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['replys_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ReplyReply record for edit
 * @GET /replyreply/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['replys_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReplyReply.editFields();
		let record = await DB.ReplyReply.findOne(query);
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
 * Route to update  ReplyReply record
 * @POST /replyreply/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('reply_id').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('replay_content').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['replys_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReplyReply.editFields();
		let record = await DB.ReplyReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.ReplyReply.update(modeldata, {where: where});
		record = await DB.ReplyReply.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ReplyReply record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /replyreply/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['replys_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ReplyReply.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['replys_id'], oldValues });
		});
		await DB.ReplyReply.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
