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


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">WebName</div>
//       <ul className="nav-links">
//       <Link to="/"><li>Home</li></Link>
//       <Link to="/calculate"><li className="active">Calculate</li></Link>
//         <li>Points</li>
//         <Link to="/auth">
//           <button className="login-btn">Login/Sign up</button>
//         </Link>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // Convert token existence to boolean
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">SustainaTrack</div>
//       <ul className="nav-links">
//         <Link to="/"><li>Home</li></Link>
//         <Link to="/calculate"><li className="active">Calculate</li></Link>
//         <li>Points</li>

//         {isLoggedIn ? (
//           <div className="profile-menu">
//             <span className="profile-icon">👤</span>
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//           </div>
//         ) : (
//           <Link to="/auth" onClick={() => localStorage.setItem("redirectAfterLogin", window.location.pathname)}>
//             <button className="login-btn">Login/Sign up</button>
//           </Link>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home after logout
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">SustainaTrack</div>
      <ul className="nav-links">
        <Link to="/"><li>Home</li></Link>
        <Link to="/calculate"><li className="active">Calculate</li></Link>
        <Link to="/redeem"><li>Redeem</li></Link>

        {isLoggedIn ? (
          <div className="profile-container" ref={dropdownRef}>
            <User
              className="profile-icon"
              size={28}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <LogOut size={18} className="logout-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth">
            <button className="login-btn">Login/Sign up</button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
