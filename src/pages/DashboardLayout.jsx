import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginData = localStorage.getItem("login");

    if (!loginData) {
      navigate("/");
    }
  });
  return (
    //navbar
    //outlet

    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
