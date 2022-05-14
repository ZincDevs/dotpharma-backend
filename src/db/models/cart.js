/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'u_id',
        targetKey: 'u_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      // this.belongsTo(models.Pharmacy, {
      //   as: 'pharmacy',
      //   foreignKey: 'o_pharmacy',
      //   targetKey: 'ph_id',
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE'
      // });
    }
  }
  Cart.init({
    c_id: DataTypes.STRING,
    c_quantity: DataTypes.STRING,
    u_id: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'u_id'
      }
    },
    m_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Medicine',
        key: 'm_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
