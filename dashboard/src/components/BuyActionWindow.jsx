// src/BuyActionWindow.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [quantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const id=String(uid);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    if (!token || !userId) {
      alert("Login First");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(`https://stocktrading-c41p.onrender.com/buy/${userId}/${id}`, {
        quantity: Number(quantity),
      });


        alert(res.data.message || `Bought ${quantity} of ${res.data.stocks.symbol}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="buy-window-container" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={quantity}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;