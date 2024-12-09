import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import logo from "./logo/wallet.png";

import NavItems from "./components/NavItems";
import fotoProfil from "./assets/avatar.png";
import viewIcon from "./assets/view.png";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  return (
    <>
      <div className="w-full px-16 mt-12">
        <div className="flex items-center justify-center">
          <div className="mr-auto">
            <h1 className="text-black text-6xl font-bold">
              Good Morning, Chelsea!
            </h1>
            <p className="text-black text-2xl mt-3">
              Check all your incoming and outgoing transactions here
            </p>
          </div>
          <div className="flex items-center gap-x-4 ml-auto">
            <span className="text-right">
              <p className="text-black font-bold">Chelsea Immanuela</p>
              <p className="text-black">Personal Account</p>
            </span>
            <div
              className={`rounded-full border-[6px] hover:border-[6px] hover:border-[#178F8D] cursor-pointer transition-all ${
                isAvatarActive ? "border-[#178F8D]" : "border-[#fafbfd]"
              }`}
              onClick={() => setIsAvatarActive((prev) => !prev)}
            >
              <img src={fotoProfil} alt="avatar" className="rounded-full " />
            </div>
          </div>
        </div>
        <div className="flex mt-[4.5rem] gap-x-12">
          <div className="bg-[#19918F] p-12 rounded-2xl w-1/5">
            <p>Account No.</p>
            <p className="mt-3 font-bold">100899</p>
          </div>
          <div className="bg-white p-12 rounded-2xl w-full text-black">
            <p>Balance</p>
            <span className="flex items-center mt-3 gap-x-2">
              <p className="font-bold">
                {showBalance ? "Rp10.000.000,00" : "Rp ********"}
              </p>
              <img
                src={viewIcon}
                alt="view"
                className="w-4 h-4 object-cover cursor-pointer"
                onClick={() => setShowBalance((prev) => !prev)}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
