/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
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
  Patient.init({
    p_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    p_name: DataTypes.STRING,
    p_email: DataTypes.STRING,
    p_phonenumber: DataTypes.STRING,
    p_address: DataTypes.STRING,
    p_country: DataTypes.STRING,
    p_town: DataTypes.STRING,
    p_district: DataTypes.STRING,
    p_streetnumber: DataTypes.STRING,
    p_national_id: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
