import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get("/transactions/all");
        setTransactions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load transactions.");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>All Transactions</h3>
        <span className="led-dot" />
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="table-wrap">
        <table className="metal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Type</th>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{t.user?.username || "-"}</td>
                <td>
                  <span className={`tag ${t.transactionType === "BUY" ? "buy" : "sell"}`}>
                    {t.transactionType}
                  </span>
                </td>
                <td>{t.stockSymbol || "-"}</td>
                <td>{t.quantity || "-"}</td>
                <td>${t.amount.toFixed(2)}</td>
                <td>${t.balanceAfter.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
