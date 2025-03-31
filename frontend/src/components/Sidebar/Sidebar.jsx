// import React, { useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   const [active, setActive] = useState("Transport");

//   const handleClick = (section) => {
//     setActive(section);
//     if (setActiveSection) {
//       setActiveSection(section);  
//     }
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li
//           className={active === "Shopping" ? "active" : ""}
//           onClick={() => handleClick("Shopping")}
//         >
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li
//           className={active === "Transport" ? "active" : ""}
//           onClick={() => handleClick("Transport")}
//         >
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li
//           className={active === "Electricity" ? "active" : ""}
//           onClick={() => handleClick("Electricity")}
//         >
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li
//           className={active === "Food" ? "active" : ""}
//           onClick={() => handleClick("Food")}
//         >
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li
//           className={active === "Result" ? "active" : ""}
//           onClick={() => handleClick("Result")}
//         >
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   const [active, setActive] = useState("Shopping");

//   const handleClick = (section) => {
//     setActive(section);
//     setActiveSection(section); // Ensure the parent component receives the update
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li
//           className={active === "Shopping" ? "active" : ""}
//           onClick={() => handleClick("Shopping")}
//         >
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li
//           className={active === "Transport" ? "active" : ""}
//           onClick={() => handleClick("Transport")}
//         >
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li
//           className={active === "Electricity" ? "active" : ""}
//           onClick={() => handleClick("Electricity")}
//         >
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li
//           className={active === "Food" ? "active" : ""}
//           onClick={() => handleClick("Food")}
//         >
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li
//           className={active === "Result" ? "active" : ""}
//           onClick={() => handleClick("Result")}
//         >
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;





// import React, { useEffect, useState } from "react";
// import "./Sidebar.css";
// import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

// const Sidebar = ({ setActiveSection }) => {
//   // Load the active section from localStorage or default to "Shopping"
//   const [active, setActive] = useState(localStorage.getItem("activeSection") || "Shopping");

//   useEffect(() => {
//     setActiveSection(active); // Ensure the parent component gets the correct section on load
//   }, []); // Runs only on component mount

//   const handleClick = (section) => {
//     setActive(section);
//     setActiveSection(section); // Ensure the parent component receives the update
//     localStorage.setItem("activeSection", section); // Store in localStorage
//   };

//   return (
//     <aside className="sidebar">
//       <ul>
//         <li className={active === "Shopping" ? "active" : ""} onClick={() => handleClick("Shopping")}>
//           <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
//         </li>
//         <li className={active === "Transport" ? "active" : ""} onClick={() => handleClick("Transport")}>
//           <Car size={20} strokeWidth={1.5} /> Transport
//         </li>
//         <li className={active === "Electricity" ? "active" : ""} onClick={() => handleClick("Electricity")}>
//           <Bolt size={20} strokeWidth={1.5} /> Electricity
//         </li>
//         <li className={active === "Food" ? "active" : ""} onClick={() => handleClick("Food")}>
//           <Utensils size={20} strokeWidth={1.5} /> Food
//         </li>
//         <li className={active === "Result" ? "active" : ""} onClick={() => handleClick("Result")}>
//           <BarChart size={20} strokeWidth={1.5} /> Result
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;




import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { ShoppingBag, Car, Bolt, Utensils, BarChart } from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [active, setActive] = useState(localStorage.getItem("activeSection") || "Shopping");

  useEffect(() => {
    console.log("Sidebar detected activeSection change:", activeSection);
    setActive(activeSection);
  }, [activeSection]); // Sync with changes from parent

  const handleClick = (section) => {
    console.log("Sidebar clicked:", section);
    setActive(section);
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  return (
    <aside className="sidebar">
      <ul>
        <li className={active === "Shopping" ? "active" : ""} onClick={() => handleClick("Shopping")}>
          <ShoppingBag size={20} strokeWidth={1.5} /> Shopping
        </li>
        <li className={active === "Transport" ? "active" : ""} onClick={() => handleClick("Transport")}>
          <Car size={20} strokeWidth={1.5} /> Transport
        </li>
        <li className={active === "Electricity" ? "active" : ""} onClick={() => handleClick("Electricity")}>
          <Bolt size={20} strokeWidth={1.5} /> Electricity
        </li>
        <li className={active === "Food" ? "active" : ""} onClick={() => handleClick("Food")}>
          <Utensils size={20} strokeWidth={1.5} /> Food
        </li>
        <li className={active === "Result" ? "active" : ""} onClick={() => handleClick("Result")}>
          <BarChart size={20} strokeWidth={1.5} /> Result
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
