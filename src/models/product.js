'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Category, {
      //   foreignKey: 'categoryId'
      // });
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    productSlug: DataTypes.STRING,
    description: DataTypes.TEXT,
    originalPrice: DataTypes.STRING,
    sellingPrice: DataTypes.STRING,
    stock: DataTypes.STRING,
    status: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};