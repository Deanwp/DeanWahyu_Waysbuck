const {shipping, user, beverage,} = require("../../models");

exports.getShipping = async (req, res) => {
  try {
    const { id } = req.params;
    let shipping = await shipping.findAll({
      where: {
        idUser: id
      },
      include: [
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

    res.send({
      status: "success",
      data: {
        shipping,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

  exports.addShipping = async (req, res) => {
    try {
    let data = req.body;
  
    data = {
      ...data,
      idUser: req.user.id,
    };
    
    await shipping.create(data);

      res.send({
        status: "success",
        message: "Add finished",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteShipping = async (req, res) => {
    try {
      const { id } = req.params;;
  
      await shipping.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Delete Shipping id: ${id} finished`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };