/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clinics', {
      c_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      c_name: {
        type: Sequelize.STRING
      },
      c_logo: {
        type: Sequelize.STRING
      },
      c_email: {
        type: Sequelize.STRING
      },
      c_phonenumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Clinics');
  }
};
