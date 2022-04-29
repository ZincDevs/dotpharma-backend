/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate(models) {
      // this.belongsTo(models.User);
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Medicine.init({
    m_id: DataTypes.STRING,
    m_name: DataTypes.STRING,
    m_properties: DataTypes.STRING,
    m_desciption: DataTypes.STRING,
    m_image: DataTypes.TEXT,
    m_price: DataTypes.STRING,
    m_status: DataTypes.STRING,
    m_type: DataTypes.STRING,
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
    modelName: 'Medicine',
  });
  return Medicine;
};
