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
    await queryInterface.bulkInsert('Reviews', [{
      spotId: 1,
      userId: 5,
      review: 'I thank it very very good. Please take me so much!',
      stars: 5
    },
      {
        spotId: 1,
        userId: 3,
        review: 'What a gorgeous woodland escape! But why do all the women around here look like Audrey Hepburn?... Minus 1 star!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Quite nice!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Haaaaaaaark, Triton!! Haaaaark!! ',
        stars: 5
      },
    {
      spotId: 2,
      userId: 4,
      review: 'Nanda kore ha?!!',
      stars: 2,
    },
    {
      spotId: 3,
      userId: 3,
      review: "Maybe don't take my word for it.",
      stars: 5,
    },
    {
      spotId: 4,
      userId: 2,
      review: 'Wonderbar!!',
      stars: 4,
    },
    {
      spotId: 5,
      userId: 1,
      review: 'Do you think I can lift 200 pounds over my head?',
      stars: 3,
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
