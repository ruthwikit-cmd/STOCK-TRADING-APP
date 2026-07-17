const Stock = require("../models/Stock");

// Simple simulated market list (in a real app this would come from a market data API)
const MARKET_STOCKS = [
  { stockName: "Tesla Inc.", stockSymbol: "TSLA", stockExchange: "NASDAQ", stockPrice: 248.5 },
  { stockName: "Apple Inc.", stockSymbol: "AAPL", stockExchange: "NASDAQ", stockPrice: 195.2 },
  { stockName: "Reliance Industries", stockSymbol: "RELIANCE", stockExchange: "NSE", stockPrice: 2945.6 },
  { stockName: "Tata Consultancy", stockSymbol: "TCS", stockExchange: "NSE", stockPrice: 3872.1 },
  { stockName: "Infosys", stockSymbol: "INFY", stockExchange: "NSE", stockPrice: 1543.4 },
  { stockName: "Amazon.com", stockSymbol: "AMZN", stockExchange: "NASDAQ", stockPrice: 178.3 },
  { stockName: "Microsoft Corp.", stockSymbol: "MSFT", stockExchange: "NASDAQ", stockPrice: 421.9 },
  { stockName: "HDFC Bank", stockSymbol: "HDFCBANK", stockExchange: "NSE", stockPrice: 1642.8 },
];

exports.getMarketStocks = async (req, res) => {
  // Add small random fluctuation so charts/prices look live
  const data = MARKET_STOCKS.map((s) => ({
    ...s,
    stockPrice: +(s.stockPrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
  }));
  res.json(data);
};

exports.getMyHoldings = async (req, res) => {
  try {
    const holdings = await Stock.find({ user: req.user.id, quantity: { $gt: 0 } });
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings", error: err.message });
  }
};

exports.getAllHoldings = async (req, res) => {
  try {
    const holdings = await Stock.find().populate("user", "username email");
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings", error: err.message });
  }
};
