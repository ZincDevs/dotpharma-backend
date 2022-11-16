/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clinic.init({
    c_id: DataTypes.STRING,
    c_name: DataTypes.STRING,
    c_logo: DataTypes.STRING,
    c_email: DataTypes.STRING,
    c_phonenumber: DataTypes.STRING,
    specialized: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  Clinic.removeAttribute('id');
  return Clinic;
};
