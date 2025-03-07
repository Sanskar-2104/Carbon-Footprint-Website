import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Shopping from "./pages/Shopping";
import Transport from "./pages/Transport";
import Electricity from "./pages/Electricity";
import Food from "./pages/Food";
import Result from "./pages/Result";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("Shopping");

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Shopping />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/electricity" element={<Electricity />} />
              <Route path="/food" element={<Food />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
