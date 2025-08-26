import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

RefreshToken.belongsTo(User, { foreignKey: 'userId' });

export default RefreshToken;