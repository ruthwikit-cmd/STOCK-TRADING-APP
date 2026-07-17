import React from "react";
import { Link } from "react-router-dom";
import AdminStockChart from "./AdminStockChart.jsx";

const Admin = () => {
  return (
    <div>
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-header">
          <h2>Admin Control Panel</h2>
          <span className="led-dot red" />
        </div>
        <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
          <Link to="/admin/users" className="btn btn-cream">
            Manage Users
          </Link>
          <Link to="/admin/orders" className="btn btn-cream">
            All Orders
          </Link>
          <Link to="/admin/transactions" className="btn btn-cream">
            All Transactions
          </Link>
        </div>
      </div>

      <AdminStockChart />
    </div>
  );
};

export default Admin;
