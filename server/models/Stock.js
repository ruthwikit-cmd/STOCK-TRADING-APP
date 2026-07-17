const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stockName: { type: String, required: true },
    stockSymbol: { type: String, required: true, uppercase: true },
    stockExchange: { type: String, default: "NSE" },
    stockPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    averagePrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", StockSchema);
