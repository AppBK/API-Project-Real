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
    },
    {
      ownerId: 2,
      address: '',
      city: 'Lakeport',
      country: 'United States',
      lat: 72.7,
      lng: 98.5,
      name: 'Sunrise Shores',
      description: 'Stunning 4 bedroom, 4 full bath with beautiful lake views.',
      price: 378,
    },
    {
      ownerId: 3,
      address: '',
      city: 'Jenner',
      state: 'California',
      country: 'United States',
      lat: 50.1,
      lng: 126.8,
      name: 'On The Rocks',
      description: 'a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & International architectural design',
      price: 1499,
    },
    {
      ownerId: 4,
      address: '',
      city: 'San Rafael',
      state: 'California',
      country: 'United States',
      lat: 89.3,
      lng: 103.6,
      name: 'Bay View Bungalow',
      description: 'FANTASTIC STUDIO BUNGALOW TUCKED ON A SECLUDED WATERFRONT ENCLAVE!',
      price: 159,
    },
    {
      ownerId: 5,
      address: '',
      city: 'Moss Beach',
      state: 'California',
      country: 'United States',
      lat: 95.4,
      lng: 205.9,
      name: 'Ocean Front Home',
      description: 'Your beachfront escape awaits you.',
      price: 1025,
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
