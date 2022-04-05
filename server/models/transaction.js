'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.shipping, {
        as: "shippings",
        foreignKey: {
          name: "idShipping",
        },
      });
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      transaction.belongsToMany(models.order, {
        as: "orders",
        through: {
          model: "orderTransaction",
          as: "bridge",
        },
        foreignKey: "idTransaction",
      });
    }
  }
  transaction.init({
    status: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idShipping:DataTypes.INTEGER,
    allPrice: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};