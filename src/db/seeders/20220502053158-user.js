/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const { v4: uuidv4 } = uuid;

dotenv.config();
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          u_id: uuidv4(),
          u_email: process.env.ADMIN_EMAIL,
          u_password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
          u_role: 'SUPER_ADMIN',
          verified: true,
          blocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          u_id: uuidv4(),
          u_email: process.env.PATIENT_EMAIL,
          u_password: bcrypt.hashSync(process.env.PATIENT_PASSWORD, 10),
          u_role: 'PATIENT',
          verified: true,
          blocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
