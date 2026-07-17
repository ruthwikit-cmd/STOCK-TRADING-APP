import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="hero">
        <h1>Trade with the feel of real hardware.</h1>
        <p>
          TradeDeck is a simulated stock trading console — buy and sell shares, track your
          portfolio, and review your history through a control panel built for clarity.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-red">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-cream">
            Sign In
          </Link>
        </div>
      </div>

      <div className="panel control-strip">
        <div className="knob-wrap">
          <div className="knob" />
          <span className="knob-label">Market</span>
        </div>
        <div className="knob-wrap">
          <div className="rocker on">
            <div className="lever" />
          </div>
          <span className="knob-label">Auto Trade</span>
        </div>
        <div className="knob-wrap">
          <div className="btn-round green" />
          <span className="knob-label">Buy</span>
        </div>
        <div className="knob-wrap">
          <div className="btn-round" />
          <span className="knob-label">Sell</span>
        </div>
      </div>

      <div className="panel-grid" style={{ marginTop: 32 }}>
        <div className="panel">
          <h3>Live Market Board</h3>
          <p className="muted">Simulated live prices for popular stocks across NSE and NASDAQ.</p>
        </div>
        <div className="panel">
          <h3>Portfolio Tracking</h3>
          <p className="muted">See your holdings, average price, and profit or loss at a glance.</p>
        </div>
        <div className="panel">
          <h3>Full Trade History</h3>
          <p className="muted">Every order and transaction logged and searchable.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
