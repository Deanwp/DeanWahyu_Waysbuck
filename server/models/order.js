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
      order.hasMany(models.transaction,{
        as: "transactions",
        foreignKey: {
          name: "idOrder",
        },
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
    }
  }
  order.init({
    idBeverage: DataTypes.INTEGER,
    qty: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};