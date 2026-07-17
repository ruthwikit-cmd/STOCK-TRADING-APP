const express = require("express");
const router = express.Router();
const { getMyTransactions, getAllTransactions } = require("../controllers/transactionController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/my-transactions", protect, getMyTransactions);
router.get("/all", protect, adminOnly, getAllTransactions);

module.exports = router;
