
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Likes extends BaseModel {
	static init() {
		return super.init(
			{
				
				like_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				material_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "likes",
				modelName: "likes",
			}
		);
	}
	
	static listFields() {
		return [
			'like_id', 
			'user_id', 
			'material_id'
		];
	}

	static viewFields() {
		return [
			'like_id', 
			'user_id', 
			'material_id'
		];
	}

	static editFields() {
		return [
			'like_id', 
			'user_id', 
			'material_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("like_id LIKE :search"),
		];
	}

	
	
}
Likes.init();
export default Likes;
