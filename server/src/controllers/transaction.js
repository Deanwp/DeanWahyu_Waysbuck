const { user, transaction, product, order} = require('../../models')

exports.getTransactions = async (req, res) => {
    try {
      let data = await transaction.findAll({
        include: [
          {
            model: order,
            as: "orders",
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

exports.addTransaction = async (req, res) => {
  try {
    let data = req.body;

    data = {
      ...data,
      idUser: req.user.id,
    };

    await transaction.create(data);

    res.send({
      status: "success",
      message: "Add transaction finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};