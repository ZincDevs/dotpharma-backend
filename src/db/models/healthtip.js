/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class HealthTip extends Model {
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
  HealthTip.init({
    h_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    h_title: DataTypes.STRING,
    h_image: DataTypes.STRING,
    h_description: DataTypes.STRING,
    h_category: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    }
  }, {
    sequelize,
    modelName: 'HealthTip',
  });
  return HealthTip;
};
