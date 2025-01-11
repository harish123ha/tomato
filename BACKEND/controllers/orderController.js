const Users = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Orders = require("../models/order");

// place order
placeOrder = async (req, res) => {
  const userId = req.userId;

  try {
    const newOrder = new Orders({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      // status me hum kuch bhi send nahi karenge kyunki hamne default value pehle he assign kar de hai model me "food processing"
    });
    const savedData = await newOrder.save();
    await Users.findByIdAndUpdate(userId, { cartData: {} });
    res.send({ success: true, message: "Place Order Successfull", savedData });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};

/// getting particulal user( who is login currently) . order for frontend
userOrders = async (req, res) => {
  try {
    let userId = req.userId;
    const allOrders = await Orders.find({ userId });
    res.json({ success: true, message: "All orders", data: allOrders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      messate: error.message,
      message2: "Error getting all orders",
    });
  }
};

module.exports = { placeOrder, userOrders };
