/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      o_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      o_prescription: {
        type: Sequelize.STRING
      },
      o_date: {
        type: Sequelize.STRING
      },
      o_status: {
        type: Sequelize.STRING
      },
      o_address: {
        type: Sequelize.STRING
      },
      u_id: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'u_id'
        }
      },
      p_id: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'p_id'
        }
      },
      o_pharmacy: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Pharmacies',
          key: 'ph_id'
        }
      },
      o_medicine: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Medicines',
          key: 'm_id'
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
    await queryInterface.dropTable('Orders');
  }
};
