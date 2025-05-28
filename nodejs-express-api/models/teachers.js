
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Teachers extends BaseModel {
	static init() {
		return super.init(
			{
				
				teacher_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				experience: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  },
				updated_at: { type:Sequelize.DATE , allowNull: false  },
				photo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "teachers",
				modelName: "teachers",
			}
		);
	}
	
	static listFields() {
		return [
			'photo', 
			'teacher_id', 
			'experience'
		];
	}

	static viewFields() {
		return [
			'teacher_id', 
			'user_id', 
			'experience', 
			'created_at', 
			'updated_at', 
			'photo'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'experience', 
			'photo', 
			'teacher_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("teacher_id LIKE :search"), 
			Sequelize.literal("experience LIKE :search"),
		];
	}

	
	
}
Teachers.init();
export default Teachers;
