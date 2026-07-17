import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Generates a deterministic-looking simulated price history for a stock
const buildHistory = (basePrice) => {
  const points = [];
  let price = basePrice * 0.9;
  for (let i = 0; i < 20; i++) {
    price = price * (1 + (Math.sin(i * 1.3) * 0.015 + (Math.random() - 0.5) * 0.01));
    points.push({ t: `D${i + 1}`, price: +price.toFixed(2) });
  }
  return points;
};

const StockChart = ({ stock }) => {
  const data = useMemo(() => buildHistory(stock?.stockPrice || 100), [stock?.stockSymbol]);

  if (!stock) return null;

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>
          {stock.stockName} <span className="muted">({stock.stockSymbol})</span>
        </h3>
        <div className="readout" style={{ padding: "6px 14px" }}>
          <span className="value" style={{ fontSize: "1.1rem" }}>
            ${stock.stockPrice}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cfcbc2" />
          <XAxis dataKey="t" tick={{ fontSize: 11 }} stroke="#5c5950" />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} stroke="#5c5950" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#d8402c" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
