/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      a_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      p_id: {
        type: Sequelize.STRING,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'p_id'
        }
      },
      d_id: {
        type: Sequelize.STRING,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Doctors',
          key: 'd_id'
        }
      },
      cl_id: {
        type: Sequelize.STRING,
      },
      a_desease: {
        type: Sequelize.STRING
      },
      a_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      a_status: {
        type: Sequelize.STRING
      },
      a_type: {
        type: Sequelize.STRING
      },
      p_name: {
        type: Sequelize.STRING
      },
      p_phone: {
        type: Sequelize.STRING
      },
      p_email: {
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
