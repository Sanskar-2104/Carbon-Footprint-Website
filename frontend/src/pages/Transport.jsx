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



// import React, { useState } from "react";
// import { useUserInput } from "../context/UserInputContext";


// const Transport = ({ setActiveSection }) => {
//   const { updateUserData } = useUserInput();

//   const [transportData, setTransportData] = useState({
//     vehicleType: "car",
//     distanceTravelled: "",
//   });

//   const handleAnswerSelect = (key, value) => {
//     setTransportData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleNext = () => {
//     updateUserData("transport", transportData);
//     setActiveSection("Electricity");
//   };

//   return (
//     <div>
//       <h2>Transport</h2>
//       <label>Vehicle Type:</label>
//       <select value={transportData.vehicleType} onChange={(e) => handleAnswerSelect("vehicleType", e.target.value)}>
//         <option value="car" defaultChecked>Car</option>
//         <option value="bike">Bike</option>
//         <option value="bus">Bus</option>
//       </select>

//       <label>Distance travelled :</label>
//       <input type="number" onChange={(e) => handleAnswerSelect("distanceTravelled", e.target.value)} />

//       <button onClick={handleNext}>Next</button>
//       <button onClick={() => setActiveSection("Shopping")}>Previous</button>
//     </div>
//   );
// };

// export default Transport;




import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";
import { Car } from "lucide-react"; // Import icon
import QuizSection from "./QuizSection";

const Transport = ({ setActiveSection }) => {
  const transportQuestions = [
    {
      key: "mode",
      question: "What is your most common mode of transportation?",
      options: [
        { label: "Car (gasoline/diesel)", value: "car" },
        { label: "Public transport (bus/train)", value: "public" },
        { label: "Bike", value: "bike" },
        { label: "Walk/bicycle", value: "walk" },
      ],
    },
    {
      key: "carpool",
      question: "Do you carpool or use rideshare?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      showFor: ["car"], // Show only if "car" is selected
    },
    {
      key: "driveFrequency",
      question: "How often do you drive your car?",
      options: [
        { label: "Every day for long distances", value: "longDaily" },
        { label: "Every day for short distances", value: "shortDaily" },
        { label: "A few times a week", value: "fewTimes" },
        { label: "Rarely or never", value: "rarely" },
      ],
      showFor: ["car"], // Show only if "car" is selected
    },
    {
      key: "dailyDistance",
      question: "How much do you travel daily in km?",
      inputField: true, // Mark as an input field
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { userData } = useUserInput();

  const handleNext = () => {
    let nextIndex = currentQuestionIndex + 1;
    while (
      nextIndex < transportQuestions.length &&
      transportQuestions[nextIndex].showFor &&
      !transportQuestions[nextIndex].showFor.includes(userData.transport?.mode)
    ) {
      nextIndex++; // Skip hidden questions
    }
    if (nextIndex < transportQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setActiveSection("Electricity"); // Move to next section
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentQuestionIndex - 1;
    while (
      prevIndex >= 0 &&
      transportQuestions[prevIndex].showFor &&
      !transportQuestions[prevIndex].showFor.includes(userData.transport?.mode)
    ) {
      prevIndex--; // Skip hidden questions
    }
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    } else {
      setActiveSection("Shopping"); // Move back to Shopping
    }
  };

  // Check if the current question should be shown based on previous answers
  const currentQuestion = transportQuestions[currentQuestionIndex];
  if (currentQuestion.showFor && !currentQuestion.showFor.includes(userData.transport?.mode)) {
    handleNext(); // Skip the question if it shouldn't be shown
    return null;
  }

  return (
    <QuizSection
      icon={Car}
      title="Transport"
      question={currentQuestion.question}
      options={currentQuestion.options || []} // Handle cases where there are no options
      category="transport"
      field={currentQuestion.key}
      followUp={currentQuestion.inputField ? { showFor: [true], question: currentQuestion.question } : null}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Transport;
