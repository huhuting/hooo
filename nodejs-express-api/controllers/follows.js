import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list follows records
 * @GET /follows/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Follows.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'id', 'desc');
		query.attributes = DB.Follows.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Follows.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Follows record
 * @GET /follows/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.viewFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to insert Follows record
 * @POST /follows/add
 */
router.post('/add/', 
	[
		body('follower_id').not().isEmpty(),
		body('following_id').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Follows record
		let record = await DB.Follows.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Follows record for edit
 * @GET /follows/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to update  Follows record
 * @POST /follows/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('follower_id').optional({nullable: true}).not().isEmpty(),
		body('following_id').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Follows.update(modeldata, {where: where});
		record = await DB.Follows.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Follows record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /follows/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Follows.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Follows.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getfollowcount/:following_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as followcount FROM follows where following_id=:param1";
        console.log("==req.params:",req.params);
        let queryParams = {
        param1: req.params.following_id
    }
    let records = await DB.rawQueryList(sqltext, queryParams);
    console.log("==records:",records);
    return res.json(records);
    }
    catch(err) {
        return res.Response(err);
    }
});router.get('/del/:following_id/:follower_id', async (req, res) => {
    try {
        let sqltext = "delete FROM follows WHERE following_id=:param1 AND follower_id=:param2";
        let queryParams = {
            param1: req.params.following_id,
            param2: req.params.follower_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch (err) {
        return res.serverError(err);
    }
});
router.get('/status/:following_id/:follower_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM follows where following_id = :param1 and follower_id = :param2";
        let queryParams = {
            param1: req.params.following_id,
            param2: req.params.follower_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
router.get('/getstarteddid/:material_id', async (req, res) => {  
    try {
        let sqltext = "SELECT user_id FROM Materials WHERE material_id = :params1";
        let queryParams = {
            params1: req.params.material_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok({startedid: records[0].user_id});
    } catch (err) {
        return res.serverError(err);
    }
});router.get('/fans/:following_id/:follower_id', async (req, res) => {  
    try {
        let sqltext = "SELECT * FROM Follows WHERE following_id = :params1 AND follower_id = :params2";
        let queryParams = {
            params1: req.params.follower_id,
            params2: req.params.following_id
        };
        const records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    } catch (err) {
        return res.serverError(err);
    }
});
export default router;
