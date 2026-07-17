import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/auth/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Registered Users</h3>
        <span className="led-dot" />
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="table-wrap">
        <table className="metal-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Balance</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`tag ${u.role === "admin" ? "sell" : "buy"}`}>{u.role}</span>
                </td>
                <td>${u.balance?.toLocaleString()}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
