// import { useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Sidebar from "./components/Sidebar/Sidebar";
// import ContentBox from "./components/ContentBox/ContentBox";
// import "./App.css";

// function App() {
//   const [activeSection, setActiveSection] = useState("Shopping"); // Manage active section here

//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />
//         <div className="main-container">
//           <Sidebar setActiveSection={setActiveSection} />
//           <ContentBox activeSection={activeSection} />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentBox from "./components/ContentBox/ContentBox";
import Home from "./pages/Home/Home"; // Import Home Page
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("Shopping"); // Manage active section here

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route
              path="/calculate"
              element={
                <>
                  <Sidebar setActiveSection={setActiveSection} />
                  <ContentBox activeSection={activeSection} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
