import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get user_id_option_list records
 * @GET /components_data/user_id_option_list
 */
router.get('/user_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT user_id as value, username as label FROM users` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get material_id_option_list records
 * @GET /components_data/material_id_option_list
 */
router.get('/material_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT material_id as value, title as label FROM materials` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get tag_id_option_list records
 * @GET /components_data/tag_id_option_list
 */
router.get('/tag_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT name AS value,name AS label FROM tags` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_username_exist/{fieldvalue}
 */
router.get('/users_username_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'username': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_id_option_list_2 records
 * @GET /components_data/user_id_option_list_2
 */
router.get('/user_id_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,user_id AS label FROM materials` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_materialsreply value
 * @GET /components_data/getcount_materialsreply
 */
router.get('/getcount_materialsreply', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM materials_reply` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_tags value
 * @GET /components_data/getcount_tags
 */
router.get('/getcount_tags', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM tags` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_likes value
 * @GET /components_data/getcount_likes
 */
router.get('/getcount_likes', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM likes` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_totalsbytag records
 * @GET /components_data/barchart_totalsbytag
 */
router.get('/barchart_totalsbytag',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT tag_id, COUNT(*) AS total_count
FROM materials
GROUP BY tag_id;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.tag_id });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.total_count) }),
			label: "total_count",
			backgroundColor: "rgba(0 , 255 , 255, 0.5)", 
			borderColor: "rgba(255 , 255 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_total_study_duration records
 * @GET /components_data/barchart_total_study_duration
 */
router.get('/barchart_total_study_duration',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    user_id, 
    SUM(study_duration) AS total_study_duration
FROM 
    study_records
GROUP BY 
    user_id;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.user_id });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.total_study_duration) }),
			label: "total_study_duration",
			backgroundColor: "rgba(192 , 192 , 192, 0.5)", 
			borderColor: "rgba(192 , 192 , 192, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get linechart_like_count records
 * @GET /components_data/linechart_like_count
 */
router.get('/linechart_like_count',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    material_id, 
    COUNT(*) AS like_count
FROM 
    likes
GROUP BY 
    material_id;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.material_id });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.like_count) }),
			label: "like_count",
			backgroundColor: "rgba(255 , 128 , 192, 0.5)", 
			borderColor: "rgba(255 , 128 , 128, 0.5)", 
			borderWidth: "2",
			fill: true
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_total_study_duration_2 records
 * @GET /components_data/barchart_total_study_duration_2
 */
router.get('/barchart_total_study_duration_2',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    user_id, 
    SUM(study_duration) AS total_study_duration
FROM 
    study_records
GROUP BY 
    user_id;` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.user_id });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.total_study_duration) }),
			label: "total_study_duration",
			backgroundColor: "rgba(192 , 192 , 192, 0.5)", 
			borderColor: "rgba(192 , 192 , 192, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
