
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ReplyReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				replys_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				reply_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				replay_content: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "reply_reply",
				modelName: "reply_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'replys_id', 
			'reply_id', 
			'replay_content', 
			'user_id'
		];
	}

	static viewFields() {
		return [
			'replys_id', 
			'reply_id', 
			'replay_content', 
			'user_id'
		];
	}

	static editFields() {
		return [
			'reply_id', 
			'replay_content', 
			'user_id', 
			'replys_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("replys_id LIKE :search"), 
			Sequelize.literal("replay_content LIKE :search"),
		];
	}

	
	
}
ReplyReply.init();
export default ReplyReply;
