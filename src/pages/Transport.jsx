import React, { useState } from "react";
import { Car } from "lucide-react";
import "./Transport.css";

const Transport = () => {
  const [fuel, setFuel] = useState(300);
  const [mode, setMode] = useState("Car");

  return (
    <div className="container">
      <div className="transport-box">
        <Car size={40} className="icon" />
        <h2>Transport</h2>
        <p>What is your mode of transport?</p>
        <div className="options">
          <label>
            <input type="radio" name="mode" value="Car" checked={mode === "Car"} onChange={() => setMode("Car")} />
            Car
          </label>
          <label>
            <input type="radio" name="mode" value="Bike" checked={mode === "Bike"} onChange={() => setMode("Bike")} />
            Bike
          </label>
          <label>
            <input type="radio" name="mode" value="Bicycle" checked={mode === "Bicycle"} onChange={() => setMode("Bicycle")} />
            Bicycle
          </label>
        </div>

        <p>How much amount of fuel you used today?</p>
        <div className="fuel-box">Rs <span>{fuel}</span></div>

        <button className="calculate-btn">Calculate & Add</button>
      </div>
    </div>
  );
};

export default Transport;
