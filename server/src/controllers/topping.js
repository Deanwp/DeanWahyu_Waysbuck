const {topping} = require("../../models");

exports.getToppings = async (req, res) => {
  try {
    let data = await topping.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })
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

exports.addTopping = async (req, res) => {
  try {
    
    const data = {
      title: req.body.title,
      price: req.body.price,
      image: req.file.filename,
    }

    let newTopping = await topping.create(data)

    newTopping = JSON.parse(JSON.stringify(newTopping))

    newTopping = {
      ...newTopping,
      image: process.env.PATH_FILE + newTopping.image
    }
    
    res.send({
      status: 'success',
      data: {
        newTopping
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

exports.getTopping = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        topping: data,
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

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTopping ={
        title : req.body.title,
        price : req.body.price,
        image : req.file.filename
    }
    let updateTopping = await topping.update(dataTopping, {
      where: {
        id,
      },
    });

   updateTopping = JSON.parse(JSON.stringify(updateTopping))

   updateTopping = {
    title : req.body.title,
    price : req.body.price,
    image : process.env.PATH_FILE + updateTopping.image
   }
  
    res.send({
      status: "success",
      message: `Update topping id: ${id} finished`,
      topping: updateTopping,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete topping id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};