import { DataTypes } from 'sequelize'
import sequelize from '#app/core/sequelize.js';

const Bet = sequelize.define('bet', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

export default Bet;