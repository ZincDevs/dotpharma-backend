/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
const Patient = require('./patient');
const Doctor = require('./doctor');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      this.belongsTo(models.Patient, {
        as: 'patient',
        foreignKey: 'p_id',
        targetKey: 'p_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Doctor, {
        as: 'doctor',
        foreignKey: 'd_id',
        targetKey: 'd_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Appointment.init({
    a_id: DataTypes.STRING,
    // p_id: DataTypes.STRING,
    // d_id: DataTypes.STRING,
    p_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Patient',
        key: 'p_id'
      }
    },
    d_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Doctor',
        key: 'd_id'
      }
    },
    a_desease: DataTypes.STRING,
    a_date: DataTypes.STRING,
    a_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
