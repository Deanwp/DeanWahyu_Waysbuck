const {favorite, user, beverage,} = require("../../models");

exports.getFavorite = async (req, res) => {
  try {
    let data = await favorite.findAll({
      include: [
        {
          model: beverage,
          as: "beverage",
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

  exports.addFavorite = async (req, res) => {
    try {
    let data = req.body;
  
    data = {
      ...data,
      idUser: req.user.id,
    };
    
    await favorite.create(data);

      res.send({
        status: "success",
        message: "Add Favorite finished",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteFavorite = async (req, res) => {
    try {
      const { id } = req.body;
  
      await favorite.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete Favorite id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };