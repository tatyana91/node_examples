import { DataTypes } from 'sequelize'
import sequelize from '#app/core/sequelize.js';

const Message = sequelize.define('message', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false
	},
	user: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default Message;