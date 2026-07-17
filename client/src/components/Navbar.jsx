import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGeneral } from "../context/GeneralContext.jsx";

const Navbar = () => {
  const { user, logout, isAdmin } = useGeneral();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to={user ? "/home" : "/"} className="navbar-brand">
        <span className="led-dot" />
        TradeDeck
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/home" className={`nav-btn ${isActive("/home") ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/portfolio" className={`nav-btn ${isActive("/portfolio") ? "active" : ""}`}>
              Portfolio
            </Link>
            <Link to="/history" className={`nav-btn ${isActive("/history") ? "active" : ""}`}>
              History
            </Link>
            <Link to="/profile" className={`nav-btn ${isActive("/profile") ? "active" : ""}`}>
              Profile
            </Link>
            {isAdmin && (
              <Link to="/admin" className={`nav-btn ${isActive("/admin") ? "active" : ""}`}>
                Admin
              </Link>
            )}
            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
