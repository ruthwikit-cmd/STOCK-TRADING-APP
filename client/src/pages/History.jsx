import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, txRes] = await Promise.all([
          axiosInstance.get("/orders/my-orders"),
          axiosInstance.get("/transactions/my-transactions"),
        ]);
        setOrders(ordersRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        setError("Could not load history.");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p className="error-text">{error}</p>}

      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-header">
          <h3>Order History</h3>
        </div>
        <div className="table-wrap">
          <table className="metal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 20 }}>
                    No orders placed yet.
                  </td>
                </tr>
              )}
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{o.stockSymbol}</td>
                  <td>
                    <span className={`tag ${o.orderType === "BUY" ? "buy" : "sell"}`}>{o.orderType}</span>
                  </td>
                  <td>{o.quantity}</td>
                  <td>${o.price.toFixed(2)}</td>
                  <td>${o.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Transaction Log</h3>
        </div>
        <div className="table-wrap">
          <table className="metal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Symbol</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Balance After</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 20 }}>
                    No transactions yet.
                  </td>
                </tr>
              )}
              {transactions.map((t) => (
                <tr key={t._id}>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
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
    </div>
  );
};

export default History;
