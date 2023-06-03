/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClinicInsurance extends Model {
  }
  ClinicInsurance.init({
    ClinicId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Clinic',
        key: 'c_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    InsuranceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Insurances',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'ClinicInsurance',
  });
  return ClinicInsurance;
};
