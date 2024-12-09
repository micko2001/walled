import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function DashboardLayout() {
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
