'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      beverage.hasMany(models.order, {
        as: "order",
        foreignKey: {
          name: "idBeverage",
        },
      });
    }
  }
  beverage.init({
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'beverage',
  });
  return beverage;
};