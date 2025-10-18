import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
      <WatchList />
      </GeneralContextProvider>
      <div className="content">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute><Summary /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/holdings" element={<PrivateRoute><Holdings /></PrivateRoute>} />
          <Route path="/positions" element={<PrivateRoute><Positions /></PrivateRoute>} />
          <Route path="/funds" element={<PrivateRoute><Funds /></PrivateRoute>} />
          
          
        
          
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
