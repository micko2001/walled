import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Transfer from "./pages/Transfer.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import Login from "./pages/Login.jsx";
import TopUp from "./pages/Topup.jsx";
import Signout from "./pages/Signout.jsx";
import { useState } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<App />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/signout" element={<Signout />} />
        </Route>
        <Route path="/" element={<Login />} />
        {/* <Route
          path="/"
          element={
            localStorage.getItem("login") != null ? (
              <Login />
            ) : (
              <DashboardLayout />
            )
          }
        /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
