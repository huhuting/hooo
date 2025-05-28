import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list materialtags records
 * @GET /materialtags/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.MaterialTags.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'tag_id', 'desc');
		query.attributes = DB.MaterialTags.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.MaterialTags.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view MaterialTags record
 * @GET /materialtags/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['tag_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MaterialTags.viewFields();
		let record = await DB.MaterialTags.findOne(query);
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
 * Route to insert MaterialTags record
 * @POST /materialtags/add
 */
router.post('/add/', 
	[
		body('material_id').not().isEmpty(),
		body('tag_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save MaterialTags record
		let record = await DB.MaterialTags.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['tag_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  MaterialTags record for edit
 * @GET /materialtags/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['tag_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MaterialTags.editFields();
		let record = await DB.MaterialTags.findOne(query);
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
 * Route to update  MaterialTags record
 * @POST /materialtags/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('material_id').optional({nullable: true}).not().isEmpty(),
		body('tag_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['tag_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.MaterialTags.editFields();
		let record = await DB.MaterialTags.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.MaterialTags.update(modeldata, {where: where});
		record = await DB.MaterialTags.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete MaterialTags record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /materialtags/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['tag_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.MaterialTags.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['tag_id'], oldValues });
		});
		await DB.MaterialTags.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
