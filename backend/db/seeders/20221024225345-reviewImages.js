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
    await queryInterface.bulkInsert('People', [{
      reviewId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-654354735692804099/original/39994223-4c25-49ac-ac21-7b47e2dfb957.jpeg?im_w=960',
    },
    {
      reviewId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/ee1eb087-5d79-4cf6-b5dc-38f93b983713.jpeg?im_w=960',
    },
    {
      reviewId: 3,
      url: 'https://a0.muscache.com/im/pictures/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73.jpg?im_w=960',
    },
    {
      reviewId: 4,
      url: 'https://a0.muscache.com/im/pictures/71ec13d7-c611-44e1-ac94-bb2a8265af65.jpg?im_w=960',
    },
    {
      reviewId: 5,
      url: 'https://a0.muscache.com/im/pictures/4e367eea-801c-43fa-a7f0-4020a57ac21e.jpg?im_w=960',
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
