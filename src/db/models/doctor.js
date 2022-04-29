/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.User, {
        as: 'userCreator',
        foreignKey: 'creator',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Appointment, {
        as: 'appointments',
        foreignKey: 'p_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Doctor.init({
    d_id: DataTypes.STRING,
    d_name: DataTypes.STRING,
    d_email: DataTypes.STRING,
    d_phone: DataTypes.STRING,
    d_speciality: DataTypes.STRING,
    d_clinic: DataTypes.STRING,
    d_image: DataTypes.TEXT,
    d_status: DataTypes.STRING,
    // u_id: DataTypes.STRING,
    // creator: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    },
    creator: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};
