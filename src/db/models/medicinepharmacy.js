/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicinePharmacy extends Model {
    static associate(models) {
      // define association here
    }
  }
  MedicinePharmacy.init({
    ph_id: DataTypes.STRING,
    m_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicinePharmacy',
  });
  return MedicinePharmacy;
};
