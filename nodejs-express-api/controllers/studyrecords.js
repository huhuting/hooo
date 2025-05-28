import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list studyrecords records
 * @GET /studyrecords/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.StudyRecords.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'record_id', 'desc');
		query.attributes = DB.StudyRecords.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.StudyRecords.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view StudyRecords record
 * @GET /studyrecords/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['record_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.StudyRecords.viewFields();
		let record = await DB.StudyRecords.findOne(query);
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
 * Route to insert StudyRecords record
 * @POST /studyrecords/add
 */
router.post('/add/', 
	[
		body('user_id').not().isEmpty().isNumeric(),
		body('material_id').not().isEmpty(),
		body('study_duration').not().isEmpty().isNumeric(),
		body('study_date').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['sysuserid'] = req.user.user_id;
		
		//save StudyRecords record
		let record = await DB.StudyRecords.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['record_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  StudyRecords record for edit
 * @GET /studyrecords/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['sysuserid'] = req.user.user_id; //filter only current records
		}
		where['record_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.StudyRecords.editFields();
		let record = await DB.StudyRecords.findOne(query);
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
 * Route to update  StudyRecords record
 * @POST /studyrecords/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('material_id').optional({nullable: true}).not().isEmpty(),
		body('study_duration').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('study_date').optional({nullable: true}).not().isEmpty(),
		body('blocknum').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('sy_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['sysuserid'] = req.user.user_id; //filter only current records
		}
		where['record_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.StudyRecords.editFields();
		let record = await DB.StudyRecords.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.StudyRecords.update(modeldata, {where: where});
		record = await DB.StudyRecords.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete StudyRecords record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /studyrecords/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['sysuserid'] = req.user.user_id; //filter only current records
		}
		where['record_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.StudyRecords.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['record_id'], oldValues });
		});
		await DB.StudyRecords.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
