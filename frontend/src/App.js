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
import LoginSignup from "./pages/Auth/LoginSignup";
import Profile from "./pages/Profile/Profile";
import Redeem from "./pages/Redeem/Redeem";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { UserInputProvider } from "./context/UserInputContext";
import CarbonInfo from "./pages/CarbonInfo/CarbonInfo";

function App() {
  const [activeSection, setActiveSection] = useState("Shopping"); // Manage active section here

  return (
    <UserInputProvider>


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
                  <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                  <ContentBox activeSection={activeSection} setActiveSection={setActiveSection} />
                </>
              }
            />
            <Route path="/auth" element={<LoginSignup />} />
            <Route path="/redeem" element={<Redeem />} />
            <Route path="/about" element={<About />} />
            <Route path="/carbonInfo" element={<CarbonInfo />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </UserInputProvider>
  );
}

export default App;




