import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import { useGeneral } from "../context/GeneralContext.jsx";
import StockChart from "./StockChart.jsx";

const Home = () => {
  const { user, updateBalance } = useGeneral();
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const fetchStocks = async () => {
    try {
      const res = await axiosInstance.get("/stocks/market");
      setStocks(res.data);
      setSelected((prev) => prev || res.data[0]);
    } catch (err) {
      setError("Could not load market data.");
    }
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 8000);
    return () => clearInterval(interval);
  }, []);

  const placeOrder = async (orderType) => {
    if (!selected) return;
    setPlacing(true);
    setMessage("");
    setError("");
    try {
      const res = await axiosInstance.post("/orders", {
        stockName: selected.stockName,
        stockSymbol: selected.stockSymbol,
        stockExchange: selected.stockExchange,
        quantity: Number(quantity),
        price: selected.stockPrice,
        orderType,
      });
      updateBalance(res.data.balance);
      setMessage(`${orderType} order for ${quantity} ${selected.stockSymbol} completed.`);
    } catch (err) {
      setError(err.response?.data?.message || "Order failed.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <div className="panel flex-between" style={{ marginBottom: 20 }}>
        <div>
          <h2>Welcome, {user?.username}</h2>
          <p className="muted">Simulated market — prices update every few seconds.</p>
        </div>
        <div className="readout">
          <div className="caption">Available Balance</div>
          <div className="value">${user?.balance?.toLocaleString()}</div>
        </div>
      </div>

      <div className="panel-grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <div className="panel">
          <div className="panel-header">
            <h3>Market Board</h3>
            <span className="led-dot" />
          </div>
          <div className="table-wrap">
            <table className="metal-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Exchange</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((s) => (
                  <tr key={s.stockSymbol}>
                    <td>{s.stockSymbol}</td>
                    <td>{s.stockName}</td>
                    <td>{s.stockExchange}</td>
                    <td>${s.stockPrice}</td>
                    <td>
                      <button className="btn btn-cream" onClick={() => setSelected(s)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Place Order</h3>
          </div>
          {selected && (
            <>
              <p>
                <strong>{selected.stockName}</strong> ({selected.stockSymbol}) — ${selected.stockPrice}
              </p>
              <div className="field">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <p className="muted">
                Estimated total: ${(selected.stockPrice * quantity).toFixed(2)}
              </p>
              {error && <p className="error-text">{error}</p>}
              {message && <p className="success-text">{message}</p>}
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button className="btn btn-green" disabled={placing} onClick={() => placeOrder("BUY")}>
                  Buy
                </button>
                <button className="btn btn-red" disabled={placing} onClick={() => placeOrder("SELL")}>
                  Sell
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <StockChart stock={selected} />
      </div>
    </div>
  );
};

export default Home;
