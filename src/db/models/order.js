/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const {
  Model
} = require('sequelize');
const User = require('./user');
const Medicine = require('./medicine');
const Pharmacy = require('./pharmacy');
const Patient = require('./pharmacy');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Pharmacy, {
        as: 'pharmacy',
        foreignKey: 'o_pharmacy',
        targetKey: 'ph_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Patient, {
        as: 'patients',
        foreignKey: 'p_id',
        targetKey: 'p_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Order.init({
    o_id: DataTypes.STRING,
    // o_medicine: DataTypes.STRING,
    o_prescription: DataTypes.STRING,
    o_date: DataTypes.STRING,
    o_status: DataTypes.STRING,
    // o_pharmacy: DataTypes.STRING,
    // p_id: DataTypes.STRING,
    // u_id: DataTypes.STRING
    o_medicine: {
      type: DataTypes.STRING,
      references: {
        model: 'Medicine',
        key: 'm_id'
      }
    },
    o_pharmacy: {
      type: DataTypes.STRING,
      references: {
        model: 'Pharmacy',
        key: 'ph_id'
      }
    },
    p_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Patient',
        key: 'p_id'
      }
    },
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
