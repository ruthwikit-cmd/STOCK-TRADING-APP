import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import axiosInstance from "../components/axiosInstance";

const AdminStockChart = () => {
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axiosInstance.get("/stocks/all");
        setHoldings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load stock data.");
      }
    };
    fetchHoldings();
  }, []);

  // Aggregate total quantity held per symbol across all users
  const aggregated = Object.values(
    holdings.reduce((acc, h) => {
      if (!acc[h.stockSymbol]) {
        acc[h.stockSymbol] = { symbol: h.stockSymbol, quantity: 0 };
      }
      acc[h.stockSymbol].quantity += h.quantity;
      return acc;
    }, {})
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Platform-wide Stock Holdings</h3>
        <span className="led-dot" />
      </div>
      {error && <p className="error-text">{error}</p>}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={aggregated}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cfcbc2" />
          <XAxis dataKey="symbol" tick={{ fontSize: 12 }} stroke="#5c5950" />
          <YAxis tick={{ fontSize: 12 }} stroke="#5c5950" />
          <Tooltip />
          <Bar dataKey="quantity" fill="#d8402c" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminStockChart;
