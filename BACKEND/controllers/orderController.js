const Users = require("../models/user");
const validator = require("validator");
const Listing = require("../models/listing");
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
    const userOrder = await Orders.find({ userId });
    res.json({ success: true, message: "All orders", data: userOrder });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      messate: error.message,
      message2: "Error getting all orders",
    });
  }
};

// delete order form admin panel okay

deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.send({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};

// getting all orders for admin panel

getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find();
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

// getting address for a particular order in admin panel

gettingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Orders.findById(id);
    res.json({ success: true, message: "get address", data: address.address });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "some error occured",
      message2: error,
    });
  }
};

// update food staus like food processig , food is running or food delevired

foodStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const { status } = req.body;
    console.log(status);
    const data = await Orders.findById(id);
    if (!data) {
      return res.json({ success: false, message: "Order not found" });
    }
    data.status = status;
    await data.save();
    res.json({
      success: true,
      message: "Status updated successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
  userOrders,
  getAllOrders,
  gettingAddress,
  deleteOrder,
  foodStatus,
};
