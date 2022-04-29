/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      // id: {
      //   autoIncrement: true,
      //   type: Sequelize.INTEGER
      // },
      a_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      // p_id: {
      //   type: Sequelize.STRING
      // },
      // d_id: {
      //   type: Sequelize.STRING
      // },
      p_id: {
        type: Sequelize.STRING,
        unique: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'p_id'
        }
      },
      d_id: {
        type: Sequelize.STRING,
        unique: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Doctors',
          key: 'd_id'
        }
      },
      a_desease: {
        type: Sequelize.STRING
      },
      a_date: {
        type: Sequelize.STRING
      },
      a_status: {
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
    await queryInterface.dropTable('Appointments');
  }
};
