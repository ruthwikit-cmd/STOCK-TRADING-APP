const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stockName: { type: String, required: true },
    stockSymbol: { type: String, required: true, uppercase: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    orderType: { type: String, enum: ["BUY", "SELL"], required: true },
    mode: { type: String, enum: ["MARKET", "LIMIT"], default: "MARKET" },
    status: { type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"], default: "COMPLETED" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
