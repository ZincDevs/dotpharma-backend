/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Insurances', [
      { insurance_name: 'Rwanda Social Security Board (RSSB)', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Mutuelle de Santé', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Sanlam Life Insurance Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Prime Insurance Company Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Sonarwa Life Insurance', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Radiant Insurance Company', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Saham Assurance Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Hollard Insurance Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Phoenix of Rwanda Assurance Company (PHORAS)', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'UAP Insurance Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Jubilee Insurance Rwanda', createdAt: new Date(), updatedAt: new Date() },
      { insurance_name: 'Resolution Insurance Rwanda', createdAt: new Date(), updatedAt: new Date() },

    ], {});
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
