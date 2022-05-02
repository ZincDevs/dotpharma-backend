/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      u_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      u_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      u_password: {
        type: Sequelize.STRING
      },
      u_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
      },
      blocked: {
        type: Sequelize.BOOLEAN
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
