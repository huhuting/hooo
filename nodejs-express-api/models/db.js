
import { Sequelize, sequelize } from './basemodel.js';

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

import Audits from './audits.js';
import Collect from './collect.js';
import Follows from './follows.js';
import HStart from './hstart.js';
import Likes from './likes.js';
import Materials from './materials.js';
import MaterialsReply from './materialsreply.js';
import Notification from './notification.js';
import Permissions from './permissions.js';
import ReplyReply from './replyreply.js';
import Roles from './roles.js';
import StudyRecords from './studyrecords.js';
import Tags from './tags.js';
import Teachers from './teachers.js';
import UserAuthentications from './userauthentications.js';
import Users from './users.js';



const op = Sequelize.Op;
const raw = Sequelize.literal; // use to include raw expression

const filterBy = function(expression, value){
	return sequelize.where(raw(expression), value);
}

// convinient functions for performing raw queries 
// return different value types

function rawQuery(queryText, options){
	return sequelize.query(queryText, options);
}

async function rawQueryList(queryText, queryParams){
	const records = await rawQuery(queryText, { replacements: queryParams, type: Sequelize.QueryTypes.SELECT });
	return records;
}

async function rawQueryOne(queryText, queryParams){
	const records = await rawQueryList(queryText, queryParams);
	return records[0] || null;
}

async function rawQueryValue(queryText, queryParams){
	const record = await rawQueryOne(queryText, queryParams);
	if(record){
		return Object.values(record)[0];
	}
	return null;
}

function getOrderBy(req, sortField = null, sortType = 'desc'){
	const orderBy = req.query.orderby || sortField;
	const orderType = req.query.ordertype || sortType;
	if (orderBy) {
		let order = raw(`${orderBy} ${orderType}`);
		return [[order]];
	}
	return null;
}

export default {
	sequelize,
	op,
	filterBy,
	raw,
	rawQuery,
	rawQueryList,
	rawQueryOne,
	rawQueryValue,
	getOrderBy,
	Audits,
	Collect,
	Follows,
	HStart,
	Likes,
	Materials,
	MaterialsReply,
	Notification,
	Permissions,
	ReplyReply,
	Roles,
	StudyRecords,
	Tags,
	Teachers,
	UserAuthentications,
	Users
}
