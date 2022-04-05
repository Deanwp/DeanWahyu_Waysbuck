'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderTransaction.init({
    idOrder: DataTypes.INTEGER,
    idTransaction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderTransaction',
  });
  return orderTransaction;
};