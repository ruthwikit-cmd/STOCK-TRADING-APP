const express = require("express");
const router = express.Router();
const { getMarketStocks, getMyHoldings, getAllHoldings } = require("../controllers/stockController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/market", getMarketStocks);
router.get("/my-holdings", protect, getMyHoldings);
router.get("/all", protect, adminOnly, getAllHoldings);

module.exports = router;
