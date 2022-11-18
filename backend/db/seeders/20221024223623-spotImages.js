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
    await queryInterface.bulkInsert('SpotImages', [{
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/e2585dc9-3ada-4368-ae61-6763e4bff9f9.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/7b27488f-c1c2-42ba-a01e-bc62976bec67.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/2d9edf51-ca05-4ab7-a3c2-20d31656a080.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/d8c4accf-f4ca-43d9-bd14-e4d1a6584a98.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755197330978114075/original/f4e0e76a-9d29-4261-a707-d99dc5b8ea4e.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/a5d14c89-9c6a-449f-838d-c978bb568e40.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/d5c5cc0e-7c29-4b5e-9fdd-8c111c14affa.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/814c2432-fd6e-4c99-b56a-193e120933cb.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/bfbcd853-d1bd-4328-8296-ecc4b2cfc2e2.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52953088/original/cf12ecf8-0dcc-467f-8d0c-ce39d3c26265.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/313b1ffa-b52c-4aba-b51f-80e94d3f2be1.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/29087f74-bd90-4cce-aa65-435673b2c3db.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/33d7a8ad-d549-4f0e-9c0d-a0d9870ec41b.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/76672df0-df76-490b-8f77-dee11757ceae.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/71ec13d7-c611-44e1-ac94-bb2a8265af65.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/c65c2579-c4d1-4c35-ab47-cd66f7740f05.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/be642ba4-0282-4671-9404-66d3fc573b85.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/364293f1-7d59-457a-a20e-f9000b232e2a.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/860cc2c6-17b7-4916-8131-16bef126e0e3.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/3ec267ac-67a2-42f0-837a-daacd03803eb.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44106940/original/66a4178c-8c97-4a18-80fb-1da7842a2f9a.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/4e367eea-801c-43fa-a7f0-4020a57ac21e.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/1e99fc05-dfeb-474e-85c6-fed7e6633d04.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/1234aabf-83e8-41c0-95f9-347ec3dcbb8a.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28254684/original/99bd44d1-abca-4b1c-b5da-eb05eaac9193.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/b5f7057b-32d4-4d15-a7bf-5e95b647a8d2.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/2ef5defc-c684-42f0-8001-4d2fea7165d1.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/bdf208ac-1bb3-4b76-be52-04fe220863f1.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/6a79cdb2-4e12-47e8-aed8-aa8b8aba81a9.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/d6a7e301-d1cb-40ee-ac9f-c802d20895da.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/709a1f8f-56a0-44e3-831f-7aa7d4360b7c.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/0edd3951-ca17-422a-a944-4ac72111e556.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/8c094d81-44ec-4441-9724-d2b9049411a5.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/f94d7304-dfd4-456c-883c-4bbabde0317a.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/a3fd4325-e4dc-4d5d-bf49-9a48b6ba4724.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/bf0a3cc2-2567-45c4-9414-1977074cb7d6.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/b4b25722-2904-4a1b-848f-dd793c342b1f.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/1b8af43e-b63e-4fd9-b0f6-2640ab017c04.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/92898489-db95-4308-ba94-ab2bf11fd1af.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-38883929/original/2c20c6a7-fa2d-40d9-81f1-b69e7f94a8cf.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/44cd237c-1081-423a-b605-b5f48ecbd5b5.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/36073274-c000-4436-9040-e755fe9de1b9.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/44b2b9fd-80d4-4932-8e6a-5922be0da367.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/a7d30026-2ccd-44bd-af79-bc74c670778b.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/193083c4-2a1b-42c1-9eaf-05b031492206.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36673623/original/08394bb4-421c-4edc-ab89-48786e589405.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/4fbce1bc-af11-442a-a04a-d1566dcdf595.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-36673623/original/54b3bbf1-c30c-4ae9-9d1c-75837e7dc3e0.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/04ea103b-5f7a-4518-8e0a-57c96c45bd91.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/6d19db42-aa39-436d-86fe-8ff36189d84d?im_w=720',
      preview: true,
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/0055a858-8c25-4d43-8d4f-30566c5ab8ab?im_w=720',
      preview: true,
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/5f84872d-fc59-4b90-8e17-09376ae28cf1?im_w=720',
      preview: true,
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/6dbfc255-5125-46bc-9cc5-b2584d247319?im_w=720',
      preview: true,
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-599104215579517058/original/2d4f2964-df80-4b52-8cf0-c82e20f82632.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-599104215579517058/original/cd6f8add-3ef5-4a60-b438-e6e5c20856c9.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-599104215579517058/original/81336e34-3af5-4395-9861-8236a958a9d1.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-599104215579517058/original/9773ba10-43b9-4a37-85f1-16b815026de6.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-599104215579517058/original/019670ad-6805-44ce-aa22-defe2fbc92e2.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/702a8b4d-f58d-4b9f-a892-294c80c5daac.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/bed11433-68e5-45bb-8ad6-112783ee5297.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/a6eb786d-795a-4464-a805-ab2b63f90a3c.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/75a52c70-36cf-4f30-ad55-93aa7d942afb.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/08ac1108-d79c-4341-909b-f58e38b99f4e.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-544062603243081437/original/4f5fb51b-59f0-480b-bb3b-4817d3dfeafd.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-544062603243081437/original/a8ee8e52-7aaa-4ce2-8869-6c80b1569220.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-544062603243081437/original/e60b72c4-2e71-40ba-94f1-bba6e3d6a4c2.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-544062603243081437/original/1365c102-5866-4345-a5ff-a0dfc9f45943.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-544062603243081437/original/fc48d57c-9f34-4439-86ca-979a2558cb79.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52443635/original/f04d4815-fc48-4ea3-813b-6fc28656ad7e.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52443635/original/1a7cbdd6-2728-4695-a61d-bf190f27ada1.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52443635/original/b389d730-7586-4d45-a7ee-f3ae85aeb1a4.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52443635/original/05f084c6-60d0-4945-81ff-d23dfb89c3ca.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52443635/original/f807eae4-7450-423c-ae11-39136711e069.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/cb33b083-1f45-46f7-af85-58689ad5b86c.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/555af945-0596-4c73-a704-2ea4a8956c8d.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/6f80d07d-b69b-4a80-a792-40f82c222937.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/863b6f5f-1797-490c-8f72-d881cfea7e75.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 16,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/8ae8d4a4-560d-44e8-b8d4-7de5da28f466.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51923559/original/fcadc6e6-a621-47c8-ac2c-5f05dd18e4e1.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/a5bfedb3-3eec-467b-a6e4-0984f125c2ae.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51923559/original/637118d0-18e0-44f8-9a23-14dc235e194e.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51923559/original/4b83e9b5-0fe7-40ff-9925-5d01da341dfb.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 17,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51923559/original/4bc4122e-04d5-4edd-8f64-18a50bfdf360.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/97e0e237-6454-4b70-9c4b-09390271a2a1.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/f538be65-fe01-473a-9c87-4637b340a587.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/e71080e7-8301-43ab-99ab-82236baefee9.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/47aada9b-e552-41a8-bdd8-7cb9bde544d1.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 18,
      url: 'https://a0.muscache.com/im/pictures/277bcbb4-ae57-41f6-a655-b609d2e26318.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44552879/original/9f511d89-35bc-4a7a-a19c-18f9b3ee53d5.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/1b80e514-74bb-44ca-8a71-e33d1d31de57.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/c0b07fa1-9ef7-4612-a606-2de9e4620307.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/7680db8e-6346-4fe4-89d6-33e8a92f333a.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 19,
      url: 'https://a0.muscache.com/im/pictures/f795b394-80d3-4fb6-ac3d-e2e0145e6f91.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/88fba7f3-0040-417b-bcbd-44b111443612.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/0ed2fe1b-c5d0-4268-b4fe-7f7fb3c74d5a.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/695a5b11-fc13-4ca4-b8ab-f930d38f277e.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/23bffa13-02a7-4cae-ac8f-6b6734cb1c37.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 20,
      url: 'https://a0.muscache.com/im/pictures/a9a1819d-d6f9-486d-9149-d5a5d3870905.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 21,
      url: 'https://a0.muscache.com/im/pictures/77d8ef5e-8a57-440d-b8f4-3d3ea95214ce.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 21,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37258899/original/2dec8764-eb96-4436-892c-9e6c08c3ca5a.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 21,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37258899/original/2dec8764-eb96-4436-892c-9e6c08c3ca5a.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 21,
      url: 'https://a0.muscache.com/im/pictures/41f1888f-d550-4b3b-84ba-2aa703c5d182.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 21,
      url: 'https://a0.muscache.com/im/pictures/d2434e46-9d33-40f0-b6b7-bab8ca94006c.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 22,
      url: 'https://a0.muscache.com/im/pictures/b2e9de7f-da39-401f-911d-1a294025dbc7.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 22,
      url: 'https://a0.muscache.com/im/pictures/265e348f-8e11-47fe-bfc1-66aa9eb0cbdb.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 22,
      url: 'https://a0.muscache.com/im/pictures/2dae44fd-5703-42c4-87e2-25722a94d777.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 22,
      url: 'https://a0.muscache.com/im/pictures/c108511a-4fd0-4f6a-8a87-34087dddd82e.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 22,
      url: 'https://a0.muscache.com/im/pictures/2d7cd096-48ac-493b-b181-480afc6b11b0.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 23,
      url: 'https://a0.muscache.com/im/pictures/fe2e6e06-9173-4167-8bda-3749ee5c1488.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 23,
      url: 'https://a0.muscache.com/im/pictures/79b9d5c4-2ea7-470e-b1bb-f87e56f01d90.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 23,
      url: 'https://a0.muscache.com/im/pictures/9c1e2429-a51f-447e-9c71-5a522f18d57d.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 23,
      url: 'https://a0.muscache.com/im/pictures/512b270d-ac15-4159-92c5-a04c869cbcae.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 23,
      url: 'https://a0.muscache.com/im/pictures/cff8c09b-3ffb-4286-bea9-53f38567e9de.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 24,
      url: 'https://a0.muscache.com/im/pictures/9e8b2c09-5783-4bd2-a430-8fc9f2c25f55.jpg?im_w=960',
      preview: true,
    },
    {
      spotId: 24,
      url: 'https://a0.muscache.com/im/pictures/3398b93a-dc48-4632-bb65-0964734f5f2f.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 24,
      url: 'https://a0.muscache.com/im/pictures/16a9c1be-f99b-41e3-8b3f-2877ae8f5624.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 24,
      url: 'https://a0.muscache.com/im/pictures/c0f71c24-8958-43f3-a18c-3eece6d864e9.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 24,
      url: 'https://a0.muscache.com/im/pictures/62f36c53-1e3e-4dd3-b89a-78d3821c3393.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 25,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53045905/original/89b5977c-2f30-42d8-83df-ac641bb0ac49.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 25,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53045905/original/6e018811-6394-4c6a-9152-829dc37236b6.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 25,
      url: 'https://a0.muscache.com/im/pictures/2a25281d-a951-4bd7-afc3-6ed9d3c2f4ad.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 25,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53045905/original/9bcff738-c129-401e-b514-ec8c3544d995.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 25,
      url: 'https://a0.muscache.com/im/pictures/30e5ba96-074e-492c-a201-0f47193119f2.jpg?im_w=720',
      preview: true,
    },
    {
      spotId: 26,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50733145/original/512b8873-f6cc-4290-b9e6-a4bf91b8804e.jpeg?im_w=960',
      preview: true,
    },
    {
      spotId: 26,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50733145/original/0c5512ff-0e40-4871-9c60-c7ff02329150.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 26,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50733145/original/bb8d373a-bb11-47b3-b875-cedbe6f645f5.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 26,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50733145/original/4606a6c8-5c56-41d4-b28e-a449df7e040f.jpeg?im_w=720',
      preview: true,
    },
    {
      spotId: 26,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50733145/original/4f117541-c7dd-4189-afe1-00d3be9ad024.jpeg?im_w=720',
      preview: true,
    },
      {
        spotId: 27,
        url: 'https://a0.muscache.com/im/pictures/e75e94e0-f292-4090-955e-74389d310115.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 27,
        url: 'https://a0.muscache.com/im/pictures/b82992ad-674d-414e-b7ec-ae74a6b9cd42.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 27,
        url: 'https://a0.muscache.com/im/pictures/14a74782-91bf-4fd1-b32a-cb972590bb2d.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 27,
        url: 'https://a0.muscache.com/im/pictures/a3a40b9a-52b0-4358-8c41-ba5fd879a458.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 27,
        url: 'https://a0.muscache.com/im/pictures/4bd42363-df17-4397-a926-5c188fa00843.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 28,
        url: 'https://a0.muscache.com/im/pictures/53595fe4-a0cf-463e-a715-29218fe621e7.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 28,
        url: 'https://a0.muscache.com/im/pictures/1fda0de9-6ea8-4fc4-aef3-4d7f78e712e1.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 28,
        url: 'https://a0.muscache.com/im/pictures/fd014c55-2d30-4fda-9ff2-edde217de9a3.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 28,
        url: 'https://a0.muscache.com/im/pictures/33d2dd36-d77d-46b4-a4e6-5d203fe2b6b4.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 28,
        url: 'https://a0.muscache.com/im/pictures/8c7458e9-bfeb-42fe-ab09-ef14faf54668.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 29,
        url: 'https://a0.muscache.com/im/pictures/c05264b7-10d7-4ee5-8e88-c2bfa9258ee3.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 29,
        url: 'https://a0.muscache.com/im/pictures/0e83c294-e5aa-48f9-91b5-ffc802f88782.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 29,
        url: 'https://a0.muscache.com/im/pictures/d6c12782-d0b8-4021-b255-77e6a2b30c4a.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 29,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52514634/original/8c8bae3a-326f-4349-81d4-a59e445e7ecd.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 29,
        url: 'https://a0.muscache.com/im/pictures/e68e8eea-5dcb-441a-bcf8-8f5f8d7be60c.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 30,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49140582/original/4abfc51b-609f-4374-a52e-9a75d7ec8b3a.png?im_w=960',
        preview: true,
      },
      {
        spotId: 30,
        url: 'https://a0.muscache.com/im/pictures/957432db-40dd-4e4b-9b5d-28c953aa4086.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 30,
        url: 'https://a0.muscache.com/im/pictures/71cd0806-0421-4bac-bc56-67b0a4e77a9e.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 30,
        url: 'https://a0.muscache.com/im/pictures/ebb37476-9bce-4255-9904-59d7337514c1.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 30,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49140582/original/3bb1ee3c-fd50-4154-8845-7737c3b14f62.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 31,
        url: 'https://a0.muscache.com/im/pictures/81c6a0f5-b0e9-4248-8994-6c363864c222.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 31,
        url: 'https://a0.muscache.com/im/pictures/b99216b9-4f66-45e7-98da-7e94722acae9.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 31,
        url: 'https://a0.muscache.com/im/pictures/d4570df0-5ee4-4742-a06e-c5a38a814f61.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 31,
        url: 'https://a0.muscache.com/im/pictures/0f166425-5002-4d86-a2d2-caf70b71f853.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 31,
        url: 'https://a0.muscache.com/im/pictures/896e0baf-a302-40b6-9313-d3cfc22c9f1d.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 32,
        url: 'https://a0.muscache.com/im/pictures/c9f05c83-69f2-478c-ab7e-91b7ee3f46b5.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 32,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-41958875/original/0d2410cd-7ce1-445c-82d7-9573e2916791.png?im_w=720',
        preview: true,
      },
      {
        spotId: 32,
        url: 'https://a0.muscache.com/im/pictures/470770b4-bbab-42ab-aef7-acd449c9820c.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 32,
        url: 'https://a0.muscache.com/im/pictures/a9216df7-3095-4156-870a-0602143c37a3.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 32,
        url: 'https://a0.muscache.com/im/pictures/7123986c-4f7d-4945-8e5c-eb6bbabb6456.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 33,
        url: 'https://a0.muscache.com/im/pictures/54442037/1eb70ca6_original.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 33,
        url: 'https://a0.muscache.com/im/pictures/8e41e1e8-3bdc-480d-b04b-0bb6653c4aae.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 33,
        url: 'https://a0.muscache.com/im/pictures/54442119/8132584c_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 33,
        url: 'https://a0.muscache.com/im/pictures/103871088/ca8cf773_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 33,
        url: 'https://a0.muscache.com/im/pictures/103870385/0b82415a_original.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 34,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681277238554123797/original/af9648fe-846a-44f6-a59d-38dd5513c5f1.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 34,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681277238554123797/original/ad80e08d-9bc9-44c2-8a2a-20d89989b49c.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 34,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681277238554123797/original/9b62446b-4b27-4438-85d1-9eb6dd6eb8dd.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 34,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681277238554123797/original/fe106658-96ba-4219-9dab-48d61f3e2743.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 34,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681277238554123797/original/2871d6f7-1da9-4d2f-8c6e-f8cad93d0c21.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 35,
        url: 'https://a0.muscache.com/im/pictures/f5db5ef1-898c-4cfc-9d83-92b3adfd1e4b.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 35,
        url: 'https://a0.muscache.com/im/pictures/3a88f3d7-e04c-407c-b30b-7310f4c6c64b.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 35,
        url: 'https://a0.muscache.com/im/pictures/935b1e84-df98-4b45-b447-748f0fa250a8.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 35,
        url: 'https://a0.muscache.com/im/pictures/6b832031-7e11-44c2-8892-b379042dd035.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 35,
        url: 'https://a0.muscache.com/im/pictures/aeb7c01c-bba6-4652-994f-613b711baab0.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 36,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53755517/original/3e62251c-77b7-4611-afc3-e70c6da2b3f6.png?im_w=960',
        preview: true,
      },
      {
        spotId: 36,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53755517/original/c34d1a1e-e5bb-4dea-a766-fe171aa6e094.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 36,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53755517/original/3a82c9e6-ecc9-41d6-a21f-f2e55396e2aa.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 36,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53755517/original/00e6fbd2-fb8c-44f9-9253-2e750a35aa66.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 36,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53755517/original/c1c7e687-b9ee-49bf-9465-4ec59cf44747.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 37,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7331481/original/4d984900-1025-4bf6-ba4b-feb0c53d1550.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 37,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7331481/original/a1fc0c96-f3de-4fda-a03d-437c026df257.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 37,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7331481/original/727d0cef-b41e-460f-b273-d3b395c0281f.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 37,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7331481/original/bbde9af4-15c9-4f7c-9a74-5a3e5450b7a6.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 37,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7331481/original/414de4ce-92bd-4d52-ac64-b1d414bb0959.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 38,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34719875/original/da5b0fa8-a47c-4e60-8d70-1c8d234dccf8.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 38,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34719875/original/fe85218f-53ab-4b40-9c8b-704bcec260bf.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 38,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34719875/original/5608086c-5012-4ddc-966a-5d714626444e.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 38,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34719875/original/70420aad-8ba3-4af7-8f74-1ef962ba3ffb.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 38,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34719875/original/29c60da0-bb9c-4542-bd0d-d0d9abdf8220.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 39,
        url: 'https://a0.muscache.com/im/pictures/04e3d1ac-47b3-419c-9ec5-13ba7626c982.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 39,
        url: 'https://a0.muscache.com/im/pictures/1a134fe0-6e29-44e7-9139-89923def65d5.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 39,
        url: 'https://a0.muscache.com/im/pictures/1b1f2d06-0173-46fc-8356-fbfeb916f2d4.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 39,
        url: 'https://a0.muscache.com/im/pictures/d7b81459-a177-4ac1-bc1c-23bc6dbdcb63.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 39,
        url: 'https://a0.muscache.com/im/pictures/72f1b853-3b26-4b00-be29-0cd7e85a298e.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 40,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-755213939721566873/original/d158e98d-87d7-4075-8f1b-e4cae1e3e865.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 40,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-755213939721566873/original/229b594e-b696-4501-9704-df8a6378fef3.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 40,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-755213939721566873/original/ad1f98ea-f122-4aff-97b1-284c7f2d2a7b.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 40,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-755213939721566873/original/85724926-4d4d-490e-a4c4-6fccdccbb811.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 40,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-755213939721566873/original/4d760211-b8be-471c-b288-037e767818a3.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 41,
        url: 'https://a0.muscache.com/im/pictures/af324546-f8c4-4e3f-bf52-0ac973f9f902.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 41,
        url: 'https://a0.muscache.com/im/pictures/d39e3978-f910-4335-a15d-00d4f751ebc2.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 41,
        url: 'https://a0.muscache.com/im/pictures/3bef4679-2685-4804-a8c8-0babf5b424e8.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 41,
        url: 'https://a0.muscache.com/im/pictures/b02dc684-9b47-46fa-86e2-369cda0ebe43.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 41,
        url: 'https://a0.muscache.com/im/pictures/56d6a241-5e9c-4947-adad-074bb1b6e4fc.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 42,
        url: 'https://a0.muscache.com/im/pictures/5a9d8026-a7a3-44e7-ac3e-28590171afc8.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 42,
        url: 'https://a0.muscache.com/im/pictures/0732c223-260c-489e-8f45-39cc840a38e5.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 42,
        url: 'https://a0.muscache.com/im/pictures/7fc499b7-d154-405c-9400-f244912fbb2f.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 42,
        url: 'https://a0.muscache.com/im/pictures/de83200a-73e8-499f-95e2-6be766d3df3e.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 42,
        url: 'https://a0.muscache.com/im/pictures/49e3169d-f030-4be5-b33d-64dc39e5e9c4.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 43,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-746779119145260672/original/b108fb28-8366-4483-afe7-f04cc22999af.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 43,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-746779119145260672/original/e2bf7aad-2826-41e0-a2d4-38959cdec214.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 43,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-746779119145260672/original/3855b137-0b73-494c-9482-7f3687733fea.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 43,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-746779119145260672/original/8e671c8c-5086-4c7b-b5a8-aff36ae1c463.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 43,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-746779119145260672/original/afb00f17-8159-4542-99f6-f08acac878c1.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 44,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-30062763/original/b718825e-e92a-41b0-9338-554f5cc68b93.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 44,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-30062763/original/d7830f1a-8763-4a8d-8780-53331574faee.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 44,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-30062763/original/be810d6b-af22-415e-8f96-1283d3a40fca.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 44,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-30062763/original/61745b1d-ca2e-4195-a998-84141569ea26.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 44,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-30062763/original/f357f788-2457-4bd4-b762-beb866f78403.jpeg?im_w=720',
        preview: true,
      },
      {
        spotId: 45,
        url: 'https://a0.muscache.com/im/pictures/e7ef464d-7c2b-4ecf-bddb-c4854560390a.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 45,
        url: 'https://a0.muscache.com/im/pictures/13168f68-0ea7-46b3-adc8-9e80298d7b68.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 45,
        url: 'https://a0.muscache.com/im/pictures/188bd021-5fa1-422d-9e96-38fa895eb166.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 45,
        url: 'https://a0.muscache.com/im/pictures/09b54925-f09c-4d56-9811-47efba939d66.jpg?im_w=720',
        preview: true,
      },
      {
        spotId: 45,
        url: 'https://a0.muscache.com/im/pictures/c2e37c70-445f-4164-97ac-7c4ccbaffb18.jpg?im_w=720',
        preview: true,
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
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};


/*

{
  spotId:
  url:
  preview: true,
},
{
  spotId:
  url:
  preview: true,
},
{
  spotId:
  url:
  preview: true,
},
{
  spotId:
  url:
  preview: true,
},
{
  spotId:
  url:
  preview: true,
},

*/
