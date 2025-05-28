
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class HStart extends BaseModel {
	static init() {
		return super.init(
			{
				
				start_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				starteduser_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				start_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "h_start",
				modelName: "h_start",
			}
		);
	}
	
	static listFields() {
		return [
			'start_id', 
			'user_id', 
			'starteduser_id', 
			'start_at'
		];
	}

	static viewFields() {
		return [
			'start_id', 
			'user_id', 
			'starteduser_id', 
			'start_at'
		];
	}

	static editFields() {
		return [
			'start_id', 
			'user_id', 
			'starteduser_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("start_id LIKE :search"),
		];
	}

	
	
}
HStart.init();
export default HStart;
