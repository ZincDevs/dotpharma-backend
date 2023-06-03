/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Insurances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Insurances.init({
    insurance_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Insurances',
  });
  return Insurances;
};
