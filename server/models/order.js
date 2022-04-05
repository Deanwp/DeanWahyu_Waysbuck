'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsToMany(models.transaction, {
        as: "transactions",
        through: {
          model: "orderTransaction",
          as: "bridge",
        },
        foreignKey: "idOrder",
      });
      order.belongsTo(models.beverage, {
        as: "beverage",
        foreignKey: {
          name: "idBeverage",
        },
      });
      order.belongsToMany(models.topping, {
        as: "toppings",
        through: {
          model: "beverageTopping",
          as: "bridge",
        },
        foreignKey: "idOrder",
      });
      order.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  order.init({
    idBeverage: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    price: DataTypes.STRING,
    qty: DataTypes.STRING,
    status: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};