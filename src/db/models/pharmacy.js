/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
// const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Pharmacy extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Pharmacy.init({
    ph_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    ph_name: DataTypes.STRING,
    ph_email: DataTypes.STRING,
    ph_phone: DataTypes.STRING,
    ph_website: DataTypes.STRING,
    ph_address: DataTypes.STRING,
    ph_status: DataTypes.STRING,
    // u_id: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Pharmacy',
  });
  return Pharmacy;
};
