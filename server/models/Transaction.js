const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    transactionType: { type: String, enum: ["BUY", "SELL", "DEPOSIT", "WITHDRAWAL"], required: true },
    stockSymbol: { type: String },
    quantity: { type: Number },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
