const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCartData,
} = require("../controllers/cartController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

router.post("/add", tokenMiddleware, addToCart);
router.post("/remove", tokenMiddleware, removeFromCart);
router.post("/get", tokenMiddleware, getCartData);

module.exports = router;
