import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Job from './Job.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coverLetter: {
    type: DataTypes.TEXT
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Application.belongsTo(User, { foreignKey: 'userId', as: 'applicant' });

export default Application;