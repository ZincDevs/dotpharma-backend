/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pharmacies', {
      ph_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ph_name: {
        type: Sequelize.STRING
      },
      ph_email: {
        type: Sequelize.STRING
      },
      ph_phone: {
        type: Sequelize.STRING
      },
      ph_website: {
        type: Sequelize.STRING
      },
      ph_address: {
        type: Sequelize.STRING
      },
      ph_status: {
        type: Sequelize.STRING
      },
      ph_logo: {
        type: Sequelize.STRING
      },
      // u_id: {
      //   type: Sequelize.STRING
      // },
      u_id: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'u_id'
        }
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
    await queryInterface.dropTable('Pharmacies');
  }
};
