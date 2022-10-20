/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          name: 'New products',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Popular',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Promotion',
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
