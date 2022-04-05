const { user, order, beverage, topping, beverageTopping } = require("../../models");

exports.getOrder = async (req, res) => {
    try {
      const { id } = req.params;
      let data = await order.findAll({
          where: {
            idUser: id,
            status: null
          },
        include: [
          {
            model: beverage,
            as: "beverage",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: topping,
            as: "toppings",
            through: {
              model: beverageTopping,
              as: "bridge",
              attributes: [],
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "role"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt",],
        },
      });
  
      data = JSON.parse(JSON.stringify(data));
  
      data = data.map((item) => {
        return { 
            ...item,
            beverage: {
                ...item.beverage,
                image: process.env.FILE_PATH + item.beverage.image,
              },
        };
      });
  
      res.send({
        status: "success...",
        data,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.addOrder = async (req, res) => {
    try {
    let { toppingId } = req.body;
    let data = req.body;
    
  
    data = {
      ...data,
      idUser: req.user.id
    };
    
    let newOrder =  await order.create(data);
    
    const beverageToppingData = toppingId.map((item) => {
      return { idOrder: newOrder.id, idTopping: parseInt(item) };
    });

    await beverageTopping.bulkCreate(beverageToppingData);

      res.send({
        status: "success",
        message: "Add order finished",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      await order.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete Order id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };