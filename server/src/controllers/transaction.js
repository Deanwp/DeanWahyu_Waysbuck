const { user, transaction, beverage, order,topping, beverageTopping,profile} = require('../../models')
const midtransClient = require('midtrans-client');

exports.getTransactions = async (req, res) => {
    try {
      let data = await transaction.findAll({
        include: [
          {
            model: order,
            as: "orders",
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
            ],
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
            orders: {
              ...item.orders,
              beverage: {
                ...item.orders.beverage,
                image: process.env.FILE_PATH + item.orders.beverage.image,
              },
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

exports.addTransaction = async (req, res) => {
  try {
    let data = req.body;

    data = {
      id: parseInt(data.idBeverage + Math.random().toString().slice(3, 8)),
      ...data,
      idUser: req.user.id,
      status: "success",
      price:"33000"
    };

    const newData = await transaction.create(data);

    const buyerData = await user.findOne({
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      where: {
        id: newData.idUser,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: newData.id,
        gross_amount: 33000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        full_name: buyerData?.name,
        email: buyerData?.email,
        phone:1234567890
      },
    };

    const payment = await snap.createTransaction(parameter)

    console.log(payment);

    res.send({
      status: "pending",
      message: "Pending transaction payment gateway",
      payment,
      order: {
        id: data.idOrder,
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

const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

exports.notification = async (req, res) => {
  try {
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(statusResponse);

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        // TODO set transaction status on your database to 'challenge'
        // and response with 200 OK
        updateTransaction("pending", orderId);
        res.status(200);
      } else if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        updateTransaction("success", orderId);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      updateTransaction("success", orderId);
      res.status(200);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      updateTransaction("failed", orderId);
      res.status(200);
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      updateTransaction("pending", orderId);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const updateTransaction = async (status, transactionId) => {
  await transaction.update(
    {
      status,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
};
