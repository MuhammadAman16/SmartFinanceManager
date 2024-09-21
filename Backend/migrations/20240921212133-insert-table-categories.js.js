'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Food & Drinks',
        icon: 'https://media.istockphoto.com/id/1141797008/vector/table-knife-and-fork-vector.jpg?s=2048x2048&w=is&k=20&c=YRmUw6MWB0BqFGY91d6mCnRMVclhrUmlhg7Ms0Z5FRQ=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Shopping',
        icon: 'https://media.istockphoto.com/id/1339064813/vector/shopping-bag-collection-handbag-icon-eco-paper-bag-simple-icons-line-and-flat-vector-style.jpg?s=2048x2048&w=is&k=20&c=qea651Q7KMeHD3eni0p8rjXNYPEgsvaHlfvMbkdxhQw=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Housing',
        icon: 'https://media.istockphoto.com/id/1276890887/vector/home-house-icon-vector-stock-illustration-design-template.jpg?s=2048x2048&w=is&k=20&c=MI8GHK_diGVXfoAt8owNEdTQL9q4E8eREdU4QySgqCc=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Vehicle',
        icon: 'https://media.istockphoto.com/id/468319810/vector/transport-icons.jpg?s=2048x2048&w=is&k=20&c=pACjcF15CPwTMr7tfSJsxjaslHrrdzFSrX-ej8OTZBI=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Life & Entertainment',
        icon: 'https://media.istockphoto.com/id/1339430762/vector/cinema-icons-set-collection-icon-popcorn-box-movie-clapper-board-film-movie-tv-video-and.jpg?s=2048x2048&w=is&k=20&c=QFLY5OIccV2o4O2iye-qmnLDK1dp-X470XhP5mA-DSs=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Communication & PC',
        icon: 'https://media.istockphoto.com/id/1338286892/vector/business-card-icons.jpg?s=2048x2048&w=is&k=20&c=O44OMHrCgEE8kcKRPF6JO4th8YSSFqE055WFxlkv7wc=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Financials',
        icon: 'https://media.istockphoto.com/id/1302936684/vector/line-coins-icons.jpg?s=2048x2048&w=is&k=20&c=Cpid0cFT52GA74X4_odC3UObhtQNVeKHmqo1i9GXNr4=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Investments',
        icon: 'https://media.istockphoto.com/id/1282812684/vector/cashback-icon-return-money-cash-back-rebate-hand-hold-coin-e-commerce-and-marketing-vector.jpg?s=2048x2048&w=is&k=20&c=rP3b2eR2uEWyWldoOkuKYO9u76JmLD72U-Ik_fOTtJ0=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        name: 'Others',
        icon: 'https://media.istockphoto.com/id/844973106/vector/set-of-packaging-symbols-including-fragile-to-protect-from-the-sun-processing-protected-from.jpg?s=2048x2048&w=is&k=20&c=Z2D04iPSYz2IBSRoz9UO-OwUal7BZL8oatDB-Vw8Xng=',
        parentCategoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
