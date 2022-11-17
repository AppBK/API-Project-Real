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
    await queryInterface.bulkInsert('Bookings', [{
      spotId: 1,
      userId: 5,
      startDate: '2023-06-02',
      endDate: '2023-06-09'
    },
      {
        spotId: 2,
        userId: 4,
        startDate: '2023-06-06',
        endDate: '2023-06-13'
      },
      // {
      //   spotId: 3,
      //   userId: 3,
      //   startDate: '2023-07-03',
      //   endDate: '2023-07-10'
      // },
      // {
      //   spotId: 4,
      //   userId: 2,
      //   startDate: '2023-07-21',
      //   endDate: '2023-07-28'
      // },
      // {
      //   spotId: 5,
      //   userId: 1,
      //   startDate: '2023-08-13',
      //   endDate: '2023-08-20'
      // },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
