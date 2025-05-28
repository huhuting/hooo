
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Follows extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				follower_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				following_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "follows",
				modelName: "follows",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'follower_id', 
			'following_id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'follower_id', 
			'following_id'
		];
	}

	static editFields() {
		return [
			'id', 
			'follower_id', 
			'following_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Follows.init();
export default Follows;
