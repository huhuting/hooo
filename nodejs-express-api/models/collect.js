
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Collect extends BaseModel {
	static init() {
		return super.init(
			{
				
				collect_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				material_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "collect",
				modelName: "collect",
			}
		);
	}
	
	static listFields() {
		return [
			'collect_id', 
			'user_id', 
			'material_id'
		];
	}

	static viewFields() {
		return [
			'collect_id', 
			'user_id', 
			'material_id'
		];
	}

	static editFields() {
		return [
			'collect_id', 
			'user_id', 
			'material_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("collect_id LIKE :search"),
		];
	}

	
	
}
Collect.init();
export default Collect;
