/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const Models = require('../models/index');

const { v4: uuidv4 } = uuid;

module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = Models;
    let user = await User.findOne({ where: { u_email: process.env.ADMIN_EMAIL } });
    user = user?.dataValues;
    await queryInterface.bulkInsert(
      'Pharmacies',
      [
        {
          ph_id: uuidv4(),
          ph_name: 'PHARMACIE CONSEIL',
          ph_email: 'info@pharmacieconseil.org',
          ph_phone: '+(250) 788381219',
          ph_website: 'https://www.pharmacieconseil.org/',
          ph_address: 'KG 541 STREET, KIGALI',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ph_id: uuidv4(),
          ph_name: 'Pharmacy Kipharma',
          ph_email: 'info@pharmacieconseil.org',
          ph_phone: '250 252 575 234',
          ph_website: 'https://rw91150-pharmacy-kipharma.contact.page/',
          ph_address: 'KN 74 Street',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ph_id: uuidv4(),
          ph_name: 'Pharmacie Continentale',
          ph_email: 'pharmacie.continental@yahoo.fr',
          ph_phone: '250788622221',
          ph_website: 'https://rw91150-pharmacy-kipharma.contact.page/',
          ph_address: 'GASABO',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ph_id: uuidv4(),
          ph_name: 'MUHIRE Pharmacy',
          ph_email: 'phmuhire@gmail.com',
          ph_phone: '250788452718',
          ph_website: '',
          ph_address: 'Nyarungene',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ph_id: uuidv4(),
          ph_name: 'UMURAVA Pharmacy',
          ph_email: 'umuravapharmacy@yahoo.fr',
          ph_phone: '250788539713',
          ph_website: '',
          ph_address: 'NYARUGENGE',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
          u_id: user.u_id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ph_id: uuidv4(),
          ph_name: 'G-NOVA PHARMACY',
          ph_email: 'gnovapharmacy@gmail.com',
          ph_phone: '250782895802',
          ph_website: '',
          ph_address: 'NYARUGENGE',
          ph_status: '1',
          ph_logo: 'https://www.pharmacieconseil.org/img/131.png',
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
