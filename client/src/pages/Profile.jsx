import React from "react";
import { useGeneral } from "../context/GeneralContext.jsx";

const Profile = () => {
  const { user } = useGeneral();

  if (!user) return null;

  return (
    <div className="panel" style={{ maxWidth: 520, margin: "0 auto" }}>
      <div className="panel-header">
        <h2>Profile</h2>
        <span className={`led-dot ${user.role === "admin" ? "red" : "green"}`} />
      </div>

      <div className="field">
        <label>Username</label>
        <input value={user.username} disabled />
      </div>
      <div className="field">
        <label>Email</label>
        <input value={user.email} disabled />
      </div>
      <div className="field">
        <label>Role</label>
        <input value={user.role} disabled />
      </div>

      <div className="readout" style={{ marginTop: 10 }}>
        <div className="caption">Account Balance</div>
        <div className="value">${user.balance?.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Profile;
