
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class StudyRecords extends BaseModel {
	static init() {
		return super.init(
			{
				
				record_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				material_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				study_duration: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				study_date: { type:Sequelize.DATE , allowNull: false  },
				blocknum: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				sy_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				sysuserid: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				timestamp: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "study_records",
				modelName: "study_records",
			}
		);
	}
	
	static listFields() {
		return [
			'record_id', 
			'user_id', 
			'material_id', 
			'study_duration', 
			'blocknum', 
			'sy_hash', 
			'sysuserid', 
			'timestamp'
		];
	}

	static viewFields() {
		return [
			'record_id', 
			'user_id', 
			'material_id', 
			'study_duration', 
			'study_date', 
			'blocknum', 
			'sy_hash', 
			'sysuserid', 
			'timestamp'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'material_id', 
			'study_duration', 
			'study_date', 
			'blocknum', 
			'sy_hash', 
			'record_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("record_id LIKE :search"), 
			Sequelize.literal("sy_hash LIKE :search"), 
			Sequelize.literal("timestamp LIKE :search"),
		];
	}

	
	
}
StudyRecords.init();
export default StudyRecords;
