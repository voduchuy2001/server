'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    wishListId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    isBlocked: DataTypes.BOOLEAN,
    passwordChangeAt: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpired: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};