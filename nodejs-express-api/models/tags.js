
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Tags extends BaseModel {
	static init() {
		return super.init(
			{
				
				tag_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "tags",
				modelName: "tags",
			}
		);
	}
	
	static listFields() {
		return [
			'tag_id', 
			'name'
		];
	}

	static viewFields() {
		return [
			'tag_id', 
			'name'
		];
	}

	static editFields() {
		return [
			'tag_id', 
			'name'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("tag_id LIKE :search"), 
			Sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
Tags.init();
export default Tags;
