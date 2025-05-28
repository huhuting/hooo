
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class MaterialTags extends BaseModel {
	static init() {
		return super.init(
			{
				
				material_id: { type: Sequelize.INTEGER, primaryKey: true, defaultValue: Sequelize.literal('DEFAULT') },
				tag_id: { type: Sequelize.INTEGER, primaryKey: true, defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "material_tags",
				modelName: "material_tags",
			}
		);
	}
	
	static listFields() {
		return [
			'material_id', 
			'tag_id'
		];
	}

	static viewFields() {
		return [
			'material_id', 
			'tag_id'
		];
	}

	static editFields() {
		return [
			'material_id', 
			'tag_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("tag_id LIKE :search"),
		];
	}

	
	
}
MaterialTags.init();
export default MaterialTags;
