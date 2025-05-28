
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				bio: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   },
				password: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				usertele: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				photo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_role_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				is_teacher: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'usertele', 
			'photo', 
			'user_role_id'
		];
	}

	static viewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'usertele', 
			'user_role_id', 
			'is_teacher'
		];
	}

	static accounteditFields() {
		return [
			'user_id', 
			'username', 
			'bio', 
			'usertele', 
			'photo', 
			'user_role_id', 
			'is_teacher'
		];
	}

	static accountviewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'usertele', 
			'user_role_id', 
			'is_teacher'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'username', 
			'bio', 
			'usertele', 
			'photo', 
			'user_role_id', 
			'is_teacher'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("user_id LIKE :search"), 
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("bio LIKE :search"), 
			Sequelize.literal("usertele LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
