import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axiosInstance.get("/stocks/my-holdings");
        setHoldings(res.data);
      } catch (err) {
        setError("Could not load portfolio.");
      }
    };
    fetchHoldings();
  }, []);

  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.stockPrice, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.quantity * h.averagePrice, 0);
  const pnl = totalValue - totalInvested;

  return (
    <div>
      <div className="panel-grid" style={{ marginBottom: 20 }}>
        <div className="readout">
          <div className="caption">Portfolio Value</div>
          <div className="value">${totalValue.toFixed(2)}</div>
        </div>
        <div className="readout">
          <div className="caption">Invested</div>
          <div className="value">${totalInvested.toFixed(2)}</div>
        </div>
        <div className="readout">
          <div className="caption">P&amp;L</div>
          <div className="value" style={{ color: pnl >= 0 ? "#b6ff7a" : "#ff8a72" }}>
            {pnl >= 0 ? "+" : ""}
            {pnl.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Your Holdings</h3>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="table-wrap">
          <table className="metal-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Avg. Price</th>
                <th>Current Price</th>
                <th>P&amp;L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 20 }}>
                    No holdings yet — place your first order from Home.
                  </td>
                </tr>
              )}
              {holdings.map((h) => {
                const stockPnl = (h.stockPrice - h.averagePrice) * h.quantity;
                return (
                  <tr key={h._id}>
                    <td>{h.stockSymbol}</td>
                    <td>{h.stockName}</td>
                    <td>{h.quantity}</td>
                    <td>${h.averagePrice.toFixed(2)}</td>
                    <td>${h.stockPrice.toFixed(2)}</td>
                    <td style={{ color: stockPnl >= 0 ? "#33472e" : "#a92a1a", fontWeight: 700 }}>
                      {stockPnl >= 0 ? "+" : ""}
                      {stockPnl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
