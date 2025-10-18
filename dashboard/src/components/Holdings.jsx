import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Holdings.css";

const Holdings = () => {
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchHoldings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`https://stocktrading-c41p.onrender.com/holdings/${userId}`);
      if (res.data.message) {
        setStocks([]);
      } else {
        setStocks(res.data.stocks || []);
        setBalance(res.data.balance || 0);
      }
    } catch (err) {
      console.error("Error fetching holdings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  const handleSell = async (stockId) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(`https://stocktrading-c41p.onrender.com/sell-holding/${userId}/${stockId}`);
      alert(res.data.message);
      fetchHoldings(); // refresh after selling
    } catch (err) {
      console.error("Error selling stock:", err);
      alert("Sell failed");
    }
  };

  if (loading) return <p>Loading your holdings...</p>;
  if (!stocks.length) return <p>No holdings yet.</p>;

  return (
    <div className="holdings-container">
      <h2>Your Holdings</h2>
    
      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Today Price</th>
              <th>Total Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const isProfit = stock.todayPrice >= stock.currentPrice;
              return (
                <tr key={stock._id}>
                  <td>{stock.symbol}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.currentPrice}</td>
                  <td className={isProfit ? "green" : "red"}>₹{stock.todayPrice}</td>
                  <td>₹{(stock.qty * stock.todayPrice).toFixed(2)}</td>
                  <td>
                    <button className="sell-btn" onClick={() => handleSell(stock._id)}>
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;