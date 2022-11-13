/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const Models = require('../models/index');

const { v4: uuidv4 } = uuid;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Clinics',
      [
        {
          c_id: uuidv4(),
          c_name: 'Rwanda eye clinic',
          c_email: '',
          c_phonenumber: '0788570838',
          c_logo: 'https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          c_id: uuidv4(),
          c_name: 'Dr. Agrawal\'s eye hospital',
          c_email: '',
          c_phonenumber: '+250788185400',
          c_logo: 'https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          c_id: uuidv4(),
          c_name: 'Kigali Optic',
          c_email: '',
          c_phonenumber: '0788521343',
          c_logo: 'https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          c_id: uuidv4(),
          c_name: 'DK Optical',
          c_email: '',
          c_phonenumber: '0788322280',
          c_logo: 'https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png',
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
  }
};
