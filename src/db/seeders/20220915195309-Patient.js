/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const uuid = require('uuid');
const Models = require('../models/index');

const { v4: uuidv4 } = uuid;

dotenv.config();

module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = Models;
    let user = await User.findOne({ where: { u_email: process.env.PATIENT_EMAIL } });
    user = user?.dataValues;
    await queryInterface.bulkInsert(
      'Patients',
      [
        {
          p_id: uuidv4(),
          p_name: 'Daniel',
          p_email: user.u_email,
          p_phonenumber: '0784871958',
          p_address: 'kacyiru',
          p_country: 'Rwanda',
          p_town: 'Kigali',
          p_district: 'Gasabo',
          p_streetnumber: '4000',
          p_national_id: '111109209209091911',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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
  }
};
