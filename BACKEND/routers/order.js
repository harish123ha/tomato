const express = require("express");
const router = express.Router();
const {
  placeOrder,
  userOrders,
  getAllOrders,
  gettingAddress,
  deleteOrder,
  foodStatus,
} = require("../controllers/orderController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

router.post("/place", tokenMiddleware, placeOrder);
router.get("/userorder", tokenMiddleware, userOrders);
router.get("/allorder", getAllOrders);
router.get("/address/:id", gettingAddress);
router.delete("/:id", deleteOrder);
router.put("/status", foodStatus);

module.exports = router;
