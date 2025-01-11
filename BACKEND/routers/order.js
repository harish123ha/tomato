const express = require("express");
const router = express.Router();
const { placeOrder, userOrders } = require("../controllers/orderController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

router.post("/place", tokenMiddleware, placeOrder);
router.get("/userorder", tokenMiddleware, userOrders);

module.exports = router;
