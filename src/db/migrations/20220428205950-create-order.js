/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     *  patid, orderid, medicines, prescription if it not medicine order,
     *  address, refcode, ordertype, paymentamout,
     *
     */
    await queryInterface.createTable('Orders', {
      o_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      o_prescription: {
        type: Sequelize.STRING
      },
      o_status: {
        type: Sequelize.STRING
      },
      o_address: {
        type: Sequelize.STRING
      },
      o_payment_ref: {
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
      },
      o_pharmacy: {
        type: Sequelize.STRING,
      },
      o_referencecode: {
        type: Sequelize.STRING,
      },
      o_paymentamout: {
        type: Sequelize.DOUBLE,
      },
      o_medicines: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      o_type: {
        type: Sequelize.STRING
      },
      o_paid: {
        type: Sequelize.BOOLEAN,
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
