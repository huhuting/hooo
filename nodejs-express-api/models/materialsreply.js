
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MaterialsReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				material_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				replay_content: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "materials_reply",
				modelName: "materials_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_id', 
			'material_id', 
			'replay_content', 
			'user_id'
		];
	}

	static viewFields() {
		return [
			'reply_id', 
			'material_id', 
			'replay_content', 
			'user_id'
		];
	}

	static editFields() {
		return [
			'material_id', 
			'replay_content', 
			'user_id', 
			'reply_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_id LIKE :search"), 
			Sequelize.literal("replay_content LIKE :search"),
		];
	}

	
	
}
MaterialsReply.init();
export default MaterialsReply;
