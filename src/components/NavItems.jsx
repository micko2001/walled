// Destructuring
import { NavLink, Link } from "react-router";
import { useState } from "react";

function NavItems({ menu }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex gap-x-8">
      {menu.map((item) => (
        <NavLink
          key={item.title}
          to={item.link}
          className={`${
            activeTab === item.title ? "text-[#19918F] font-bold" : "text-black"
          }`}
          onClick={() => setActiveTab(item.title)}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

export default NavItems;
