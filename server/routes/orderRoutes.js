const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/all", protect, adminOnly, getAllOrders);

module.exports = router;
