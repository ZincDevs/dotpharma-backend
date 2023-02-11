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
    o_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    o_prescription: DataTypes.STRING,
    o_status: DataTypes.STRING,
    o_referencecode: DataTypes.STRING,
    o_address: DataTypes.STRING,
    o_paymentamout: DataTypes.DOUBLE,
    o_medicines: DataTypes.ARRAY(DataTypes.STRING),
    o_type: DataTypes.STRING,
    o_pharmacy: DataTypes.STRING,
    o_paid: DataTypes.BOOLEAN,
    o_payment_ref: DataTypes.STRING,
    p_id: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
