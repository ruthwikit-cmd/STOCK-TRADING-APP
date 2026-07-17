const mongoose = require("mongoose");
const User = require("../models/User");
const Stock = require("../models/Stock");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");

exports.placeOrder = async (req, res) => {
  const { stockName, stockSymbol, quantity, price, orderType, stockExchange } = req.body;

  if (!stockName || !stockSymbol || !quantity || !price || !orderType) {
    return res.status(400).json({ message: "Missing required order fields" });
  }
  if (quantity <= 0 || price <= 0) {
    return res.status(400).json({ message: "Quantity and price must be positive" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalAmount = +(quantity * price).toFixed(2);
    let holding = await Stock.findOne({ user: user._id, stockSymbol });

    if (orderType === "BUY") {
      if (user.balance < totalAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      user.balance = +(user.balance - totalAmount).toFixed(2);

      if (holding) {
        const newQty = holding.quantity + quantity;
        holding.averagePrice = +(
          (holding.averagePrice * holding.quantity + price * quantity) / newQty
        ).toFixed(2);
        holding.quantity = newQty;
        holding.stockPrice = price;
        await holding.save();
      } else {
        holding = await Stock.create({
          user: user._id,
          stockName,
          stockSymbol,
          stockExchange: stockExchange || "NSE",
          stockPrice: price,
          quantity,
          averagePrice: price,
        });
      }
    } else if (orderType === "SELL") {
      if (!holding || holding.quantity < quantity) {
        return res.status(400).json({ message: "Not enough shares to sell" });
      }
      holding.quantity -= quantity;
      holding.stockPrice = price;
      await holding.save();
      user.balance = +(user.balance + totalAmount).toFixed(2);
    } else {
      return res.status(400).json({ message: "Invalid order type" });
    }

    await user.save();

    const order = await Order.create({
      user: user._id,
      stockName,
      stockSymbol,
      quantity,
      price,
      totalAmount,
      orderType,
    });

    await Transaction.create({
      user: user._id,
      order: order._id,
      transactionType: orderType,
      stockSymbol,
      quantity,
      amount: totalAmount,
      balanceAfter: user.balance,
    });

    res.status(201).json({ order, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
