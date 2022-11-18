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
    await queryInterface.bulkInsert('ReviewImages', [{
      reviewId: 1,
      url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5OTk1NTMxMTYwODU1ODk2/audrey-hepburn-gettyimages-517443052.jpg',
    },
    {
      reviewId: 2,
      url: 'https://www.russh.com/wp-content/uploads/2020/10/Audrey-Hepburn.jpg'
    },
    {
      reviewId: 3,
      url: 'https://image.invaluable.com/housePhotos/BlackRiver/36/676836/H21714-L215452802_original.jpg'
    },
    {
      reviewId: 4,
      url: 'https://pleasurephotoroom.files.wordpress.com/2013/09/audrey-hepburn-photo-mark-shaw-1954-b.jpg'
    },
    {
      reviewId: 5,
      url: 'https://cdn.britannica.com/32/68032-050-26C49C30/Audrey-Hepburn-1955.jpg',
    },
    {
      reviewId: 6,
      url: 'https://images.mubicdn.net/images/cast_member/5030/cache-6050-1526604798/image-w856.jpg?size=256x',
    },
    {
      reviewId: 7,
      url: 'https://www.mapadoceu.com.br/photo/astro/audrey-hepburn.jpg?v=1521849600',
    },
    {
      reviewId: 8,
      url: 'https://pyxis.nymag.com/v1/imgs/5eb/518/926d2c37fb00ac4533194a82716c7b14f6-06-audrey-hepburn.2x.rvertical.w330.jpg',
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


// https://www.russh.com/wp-content/uploads/2020/10/Audrey-Hepburn.jpg
// https://image.invaluable.com/housePhotos/BlackRiver/36/676836/H21714-L215452802_original.jpg
// https://media.mutualart.com/Images/2019_05/04/11/114804937/ca3f2da4-13a8-4b0d-9b44-b5e0b4b20e95_570.Jpeg
// https://pleasurephotoroom.files.wordpress.com/2013/09/audrey-hepburn-photo-mark-shaw-1954-b.jpg
// https://www.filmcomment.com/wp-content/uploads/sites/2/2019/03/Hepburn_Feature-2-1600x900-c-default.jpg
