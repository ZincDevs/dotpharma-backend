/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Patient, {
        as: 'patients',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Doctor, {
        as: 'doctors',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Doctor, {
        as: 'createdDoctors',
        foreignKey: 'creator',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Pharmacy, {
        as: 'pharmacies',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Medicine, {
        as: 'medicines',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      // this.hasMany(models.Appointment, {
      //   as: 'user',
      //   foreignKey: 'u_id',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      this.hasMany(models.HealthTip, {
        as: 'healthTip',
        foreignKey: 'u_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    u_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    u_email: DataTypes.STRING,
    u_password: DataTypes.STRING,
    u_role: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
