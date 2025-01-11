const Users = require("../models/user");
const validator = require("validator");

const jwt = require("jsonwebtoken");
const { get } = require("mongoose");

// ADD TO CART FUNCTIONALITY

addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Id===", userId);

    const itemId = req.body.itemId;
    console.log("product", itemId);
    const user = await Users.findById(userId);
    // res.send(user);
    let cartData = user.cartData;
    // res.send(cartData);
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await Users.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Add To Cart", user });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
      message2: "some error occured",
    });
  }
};

// REMOVE FROM CART FUNCTIONALITY

removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Id===", userId);

    const itemId = req.body.itemId;
    console.log("product", itemId);
    const user = await Users.findById(userId);
    // res.send(user);
    let cartData = user.cartData;
    // res.send(cartData);
    if (!cartData[req.body.itemId]) {
      return res.json({ success: false, message: "Please add to cart first" });
    }
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await Users.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Remove From Cart", user });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      message2: "some error occured?",
    });
  }
};

// FETCH CART DETAILS

getCartData = async (req, res) => {
  try {
    let userId = req.userId;
    //   res.send("sadfasdfasdf");
    const user = await Users.findById(userId);
    // res.send(user);
    let cartData = user.cartData;
    res.json({ success: true, message: "all cart Data", cartData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      message2: "some error occured?",
    });
  }
};

module.exports = { addToCart, removeFromCart, getCartData };
