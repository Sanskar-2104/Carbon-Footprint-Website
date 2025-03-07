import React, { useState } from "react";
import "./Sidebar.css";
import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

const Sidebar = ({ setActiveSection }) => {
  const [active, setActive] = useState("Transport");

  const handleClick = (section) => {
    setActive(section);
    if (setActiveSection) {
      setActiveSection(section);  // Ensure function is defined before calling
    }
  };

  return (
    <aside className="sidebar">
      <ul>
        <li
          className={active === "Shopping" ? "active" : ""}
          onClick={() => handleClick("Shopping")}
        >
          <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
        </li>
        <li
          className={active === "Transport" ? "active" : ""}
          onClick={() => handleClick("Transport")}
        >
          <Car size={20} strokeWidth={1.5} /> Transport
        </li>
        <li
          className={active === "Electricity" ? "active" : ""}
          onClick={() => handleClick("Electricity")}
        >
          <Bolt size={20} strokeWidth={1.5} /> Electricity
        </li>
        <li
          className={active === "Food" ? "active" : ""}
          onClick={() => handleClick("Food")}
        >
          <Utensils size={20} strokeWidth={1.5} /> Food
        </li>
        <li
          className={active === "Result" ? "active" : ""}
          onClick={() => handleClick("Result")}
        >
          <BarChart size={20} strokeWidth={1.5} /> Result
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
