'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shipping.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      shipping.hasMany(models.transaction,{
        as: "transaction",
        foreignKey: {
          name: "idShipping",
        },
      });
    }
  }
  shipping.init({
    idUser: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    postCode: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'shipping',
  });
  return shipping;
};