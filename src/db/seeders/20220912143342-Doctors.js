/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const uuid = require('uuid');
const Models = require('../models/index');

const { v4: uuidv4 } = uuid;

dotenv.config();

module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = Models;
    let user = await User.findOne({ where: { u_email: process.env.ADMIN_EMAIL } });
    user = user?.dataValues;

    await queryInterface.bulkInsert('Doctors', [{
      d_id: uuidv4(),
      d_name: 'Dr. Jean Paul Byiringiro',
      d_email: 'jeanpaul.byiringiro@kfhkigali.com',
      d_phone: '+250783825851',
      d_speciality: 'gynecologist and obstetrician',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/09/Byiringiro-2-1.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      d_id: uuidv4(),
      d_name: 'Dr. Albert Nzayisenga',
      d_email: 'albert.nzayisenga@kfhkigali.com',
      d_phone: '+250783825851',
      d_speciality: 'Orthopedic Surgeon',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/09/ALBERT.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      d_id: uuidv4(),
      d_name: 'Prof. Emmy Agabe Nkusi',
      d_email: 'emmy.nkusi@kfhkigali.com ',
      d_phone: '+250783825851',
      d_speciality: 'gynecologist and obstetrician',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/09/DSC_2038-e1606835089759.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      d_id: uuidv4(),
      d_name: 'Dr. Amha Meshesha Weldehana',
      d_email: 'amha.meshesha@kfhkigali.com',
      d_phone: '+250783825851',
      d_speciality: 'consultant cardiologist',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/12/DSC_2095-e1606835555689.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      d_id: uuidv4(),
      d_name: 'Dr. Rajab Mugabo',
      d_email: 'jeanpaul.byiringiro@kfhkigali.com',
      d_phone: '+250783825851',
      d_speciality: 'Ear, Nose and Throat specialist',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/09/Byiringiro-2-1.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      d_id: uuidv4(),
      d_name: 'Dr. Hanna Aberra',
      d_email: 'hanna.aberra@kfhkigali.com',
      d_phone: '+250788123200',
      d_speciality: 'gastroenterologist and hepatologist',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2021/05/DSC_2023.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      d_id: uuidv4(),
      d_name: 'Dr. Amol Kulkarni',
      d_email: 'amol.kulkarni@kfhkigali.com',
      d_phone: '+250783825851',
      d_speciality: 'maxillofacial surgeon',
      d_clinic: 'King Faisal Hospital',
      d_image: 'https://kfh.rw/wp-content/uploads/2020/09/DSC_3679-2.jpg',
      u_id: user.u_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
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
