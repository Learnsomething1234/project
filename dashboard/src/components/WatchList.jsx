import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import "./WatchList.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const WatchList = () => {
  const [wat, setWa] = useState([]);
  const [loading, setLoading] = useState(true);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const fetchWa = async () => {
      try {
        const res = await axios.get("https://stocktrading-c41p.onrender.com/watchlist");
        setWa(res.data.stocks || []);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWa();
  }, []);

  if (loading) return <p>Loading latest watchlist...</p>;

  const labels = wat.map((stock) => stock.symbol);

  const doughnutData = {
    labels,
    datasets: [
      {
        label: "Current Price",
        data: wat.map((stock) => stock.currentPrice),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Current Price",
        data: wat.map((stock) => stock.currentPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stock Prices Bar Chart" },
    },
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: INFY, TCS, RELIANCE"
          className="search"
        />
        <span className="counts">{wat.length} / 50</span>
      </div>

      <ul className="list">
        {wat.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {/* Charts */}
      <div className="charts">
        <DoughnutChart data={doughnutData} />
        <div className="bar-chart-container">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default WatchList;

// ========================= ITEM COMPONENT =========================
const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  return (
    <li
      className="watchlist-item"
      onMouseEnter={() => setShowWatchListActions(true)}
      onMouseLeave={() => setShowWatchListActions(false)}
    >
      <div className="item-row">
        <span className="symbol">{stock.symbol}</span>
        <span className="price">₹{stock.currentPrice}</span>
        <span className="type">{stock.type1}</span>
      </div>
      {showWatchListActions && <WatchListActions stock={stock} />}
    </li>
  );
};

// ========================= ACTION BUTTONS =========================
const WatchListActions = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(stock._id); // 👈 open BuyWindow like Orders
  };

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={handleBuyClick}>
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell">Sell</button>
      </Tooltip>

      <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>

      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <MoreHoriz className="icons" />
      </Tooltip>
    </span>
  );
};