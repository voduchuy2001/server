'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        type: Sequelize.STRING
      },
      productSlug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      originalPrice: {
        type: Sequelize.STRING
      },
      sellingPrice: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.ENUM,
        values: [
          'inStock', 'outStock'
        ],
        defaultValue: 'inStock',
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};