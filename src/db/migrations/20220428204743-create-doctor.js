/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      // id: {
      //   autoIncrement: true,
      //   type: Sequelize.INTEGER
      // },
      d_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      d_name: {
        type: Sequelize.STRING
      },
      d_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      d_phone: {
        type: Sequelize.STRING
      },
      d_speciality: {
        type: Sequelize.STRING
      },
      d_clinic: {
        type: Sequelize.STRING
      },
      d_image: {
        type: Sequelize.TEXT
      },
      d_status: {
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
      creator: {
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
    await queryInterface.dropTable('Doctors');
  }
};
