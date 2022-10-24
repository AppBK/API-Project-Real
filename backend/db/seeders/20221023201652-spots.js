'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [{
      ownerId: 1,
      address: '',
      city: 'Carnelian Bay',
      state: 'California',
      country: 'United States',
      lat: 93.2,
      lng: 1008,
      name: 'Sunset Lake View',
      description: 'Large Lake View home w/ Hot Tub, Pool Table + Guest House',
      price: 692,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
