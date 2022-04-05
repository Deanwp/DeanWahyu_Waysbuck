const {shipping, user} = require("../../models");

exports.getShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await shipping.findAll({
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
      data
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
    const { name,phone,postCode,address } = req.body
    let newAddress = await shipping.create({
      name,
      phone,
      postCode,
      address,
      idUser: req.user.id
    })

    newAddress = JSON.parse(JSON.stringify(newAddress))
    
    res.send({
      status: 'success',
      data: {
        newAddress
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
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