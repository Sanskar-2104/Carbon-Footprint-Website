// import React, { useState } from "react";
// import { Car } from "lucide-react";
// import "./Transport.css";

// const Transport = () => {
//   const [fuel, setFuel] = useState("");

//   return (
//     <div className="transport-content">
//       <div className="transport-header">
//         <Car size={40} className="icon" />
//         <h2>Transport</h2>
//       </div>
//       <hr />

//       <p className="question">What is your mode of transport?</p>
//       <div className="options">
//         <label className="option">
//           <input type="radio" name="mode" value="Car" defaultChecked /> Car
//         </label>
//         <label className="option">
//           <input type="radio" name="mode" value="Bike" /> Bike
//         </label>
//         <label className="option">
//           <input type="radio" name="mode" value="Bicycle" /> Bicycle
//         </label>
//       </div>

//       <p className="question">How much amount of fuel you used today?</p>
//       <div className="fuel-input-container">
//         <span className="rs-text">Rs</span>
//         <input
//           type="number"
//           value={fuel}
//           onChange={(e) => setFuel(e.target.value)}
//           className="fuel-input"
//           placeholder="Enter amount"
//         />
//       </div>

//       <button className="calculate-btn">Calculate & Add</button>
//     </div>
//   );
// };

// export default Transport;


// import React from "react";
// import { Car } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Transport = () => {
//   return (
//     <QuizSection
//       icon={Car}
//       title="Transport"
//       question="What is your mode of transport?"
//       options={[
//         { label: "Car", value: "car" },
//         { label: "Bike", value: "bike" },
//         { label: "Bicycle", value: "bicycle" },
//       ]}
//       followUp={{
//         showFor: ["car", "bike"], // Show only if "Car" is selected
//         question: "How much distance you travelled today?",
//       }}
//     />
//   );
// };

// export default Transport;



import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";


const Transport = ({ setActiveSection }) => {
  const { updateUserData } = useUserInput();

  const [transportData, setTransportData] = useState({
    vehicleType: "",
    fuelAmount: "",
  });

  const handleAnswerSelect = (key, value) => {
    setTransportData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    updateUserData("transport", transportData);
    setActiveSection("Electricity");
  };

  return (
    <div>
      <h2>Transport</h2>
      <label>Vehicle Type:</label>
      <select onChange={(e) => handleAnswerSelect("vehicleType", e.target.value)}>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="bus">Bus</option>
      </select>

      <label>Distance travelled :</label>
      <input type="number" onChange={(e) => handleAnswerSelect("fuelAmount", e.target.value)} />

      <button onClick={handleNext}>Next</button>
      <button onClick={() => setActiveSection("Shopping")}>Previous</button>
    </div>
  );
};

export default Transport;
