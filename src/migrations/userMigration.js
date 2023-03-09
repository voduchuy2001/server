'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      mobile: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      wishListId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      passwordChangeAt: {
        type: Sequelize.STRING
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      passwordResetExpires: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};