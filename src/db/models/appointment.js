/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');

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
    a_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    p_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Patient',
        key: 'p_id'
      }
    },
    d_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Doctor',
        key: 'd_id'
      }
    },
    cl_id: DataTypes.STRING,
    a_desease: DataTypes.STRING,
    a_status: DataTypes.STRING,
    a_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
