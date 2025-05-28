
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Materials extends BaseModel {
	static init() {
		return super.init(
			{
				
				material_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				title: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				file_path: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				category: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  },
				updated_at: { type:Sequelize.DATE , allowNull: false  },
				video: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tag_id: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "materials",
				modelName: "materials",
			}
		);
	}
	
	static listFields() {
		return [
			'material_id', 
			'title', 
			'category', 
			'video', 
			'tag_id', 
			'description', 
			'user_id'
		];
	}

	static viewFields() {
		return [
			'material_id', 
			'user_id', 
			'title', 
			'file_path', 
			'description', 
			'category', 
			'created_at', 
			'updated_at', 
			'video', 
			'tag_id'
		];
	}

	static editFields() {
		return [
			'title', 
			'description', 
			'file_path', 
			'category', 
			'video', 
			'tag_id', 
			'material_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("material_id LIKE :search"), 
			Sequelize.literal("title LIKE :search"), 
			Sequelize.literal("category LIKE :search"), 
			Sequelize.literal("description LIKE :search"),
		];
	}

	
	
}
Materials.init();
export default Materials;
