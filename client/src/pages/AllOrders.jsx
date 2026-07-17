import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/all");
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>All Orders</h3>
        <span className="led-dot" />
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="table-wrap">
        <table className="metal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.user?.username || "-"}</td>
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
  );
};

export default AllOrders;
