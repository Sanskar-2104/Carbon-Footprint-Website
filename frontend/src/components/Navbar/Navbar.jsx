// import React from "react";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">WebName</div>
//       <ul className="nav-links">
//         <li>Home</li>
//         <li className="active">Calculate</li>
//         <li>Points</li>
//         <button className="login-btn">Login/Sign up</button>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">WebName</div>
      <ul className="nav-links">
      <Link to="/"><li>Home</li></Link>
      <Link to="/calculate"><li className="active">Calculate</li></Link>
        <li>Points</li>
        <Link to="/auth">
          <button className="login-btn">Login/Sign up</button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
