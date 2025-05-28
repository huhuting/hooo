
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class UserAuthentications extends BaseModel {
	static init() {
		return super.init(
			{
				
				ua_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				auth_type: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				auth_id: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				auth_data: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				login_time: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "user_authentications",
				modelName: "user_authentications",
			}
		);
	}
	
	static listFields() {
		return [
			'ua_id', 
			'user_id', 
			'auth_type', 
			'auth_id', 
			'auth_data', 
			'login_time'
		];
	}

	static viewFields() {
		return [
			'ua_id', 
			'user_id', 
			'auth_type', 
			'auth_id', 
			'auth_data', 
			'login_time'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'auth_type', 
			'auth_id', 
			'auth_data', 
			'ua_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("ua_id LIKE :search"), 
			Sequelize.literal("auth_type LIKE :search"), 
			Sequelize.literal("auth_id LIKE :search"), 
			Sequelize.literal("auth_data LIKE :search"),
		];
	}

	
	
}
UserAuthentications.init();
export default UserAuthentications;
