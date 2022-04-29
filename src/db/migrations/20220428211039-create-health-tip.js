/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthTips', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      h_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      h_title: {
        type: Sequelize.STRING
      },
      h_image: {
        type: Sequelize.STRING
      },
      h_description: {
        type: Sequelize.STRING
      },
      h_category: {
        type: Sequelize.STRING
      },
      // u_id: {
      //   type: Sequelize.STRING
      // },
      u_id: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable('HealthTips');
  }
};
