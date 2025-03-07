import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">WebName</div>
      <ul className="nav-links">
        <li>Home</li>
        <li className="active">Calculate</li>
        <li>Points</li>
        <button className="login-btn">Login/Sign up</button>
      </ul>
    </nav>
  );
};

export default Navbar;
