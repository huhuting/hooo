import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list collect records
 * @GET /collect/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Collect.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'collect_id', 'desc');
		query.attributes = DB.Collect.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Collect.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Collect record
 * @GET /collect/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Collect.viewFields();
		let record = await DB.Collect.findOne(query);
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
 * Route to insert Collect record
 * @POST /collect/add
 */
router.post('/add/', 
	[
		body('user_id').not().isEmpty(),
		body('material_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Collect record
		let record = await DB.Collect.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['collect_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Collect record for edit
 * @GET /collect/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Collect.editFields();
		let record = await DB.Collect.findOne(query);
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
 * Route to update  Collect record
 * @POST /collect/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true}).not().isEmpty(),
		body('material_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Collect.editFields();
		let record = await DB.Collect.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Collect.update(modeldata, {where: where});
		record = await DB.Collect.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Collect record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /collect/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['collect_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Collect.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['collect_id'], oldValues });
		});
		await DB.Collect.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getcollectcount/:material_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as collectcount FROM collect where material_id=:param1";
        console.log("==req.params:",req.params);
        let queryParams = {
        param1: req.params.material_id
    }
    let records = await DB.rawQueryList(sqltext, queryParams);
    console.log("==records:",records);
    return res.json(records);
    }
    catch(err) {
        return res.Response(err);
    }
});router.get('/del/:material_id/:user_id', async (req, res) => {
    try {
        let sqltext = "delete FROM collect WHERE material_id=:param1 AND user_id=:param2";
        let queryParams = {
            param1: req.params.material_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch (err) {
        return res.serverError(err);
    }
});
router.get('/status/:material_id/:user_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM collect where material_id = :param1 and user_id = :param2";
        let queryParams = {
            param1: req.params.material_id,
            param2: req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
export default router;
