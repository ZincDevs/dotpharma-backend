/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      p_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      p_name: {
        type: Sequelize.STRING,
      },
      p_email: {
        type: Sequelize.STRING,
      },
      p_phonenumber: {
        type: Sequelize.STRING,
      },
      p_address: {
        type: Sequelize.STRING
      },
      p_country: {
        type: Sequelize.STRING
      },
      p_town: {
        type: Sequelize.STRING
      },
      p_district: {
        type: Sequelize.STRING
      },
      p_streetnumber: {
        type: Sequelize.STRING
      },
      p_national_id: {
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
    await queryInterface.dropTable('Patients');
  }
};
