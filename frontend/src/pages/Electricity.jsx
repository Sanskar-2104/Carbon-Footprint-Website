// import React from "react";
// import { Zap } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Electricity = () => {
//   return (
//     <QuizSection
//       icon={Zap}
//       title="Electricity Usage"
//       question="How much electricity did you use today?"
//       options={[
//         { label: "Low (0-5 kWh)", value: "low" },
//         { label: "Medium (5-15 kWh)", value: "medium" },
//         { label: "High (15+ kWh)", value: "high" },
//       ]}
//       followUp={{
//         showFor: ["high"], // Convert to array for consistency
//         question: "What is your electricity unit this month?",
//       }}      
//     />
//   );
// };

// export default Electricity;



// import React from "react";
// import { Zap } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Electricity = () => {
//   return (
//     <QuizSection
//       icon={Zap}
//       title="Electricity Usage"
//       question="How much electricity did you use today?"
//       options={[
//         { label: "Low (0-5 kWh)", value: "low" },
//         { label: "Medium (5-15 kWh)", value: "medium" },
//         { label: "High (15+ kWh)", value: "high" },
//       ]}
//       followUp={{
//         showFor: ["high"],
//         question: "What is your electricity unit this month?",
//       }}
//       category="electricity" // ✅ Pass category
//     />
//   );
// };

// export default Electricity;



import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";

const Electricity = ({ setActiveSection }) => {
  const { updateUserData } = useUserInput();

  const [electricityBill, setElectricityBill] = useState("");

  const handleNext = () => {
    updateUserData("energy", { electricityBill });
    setActiveSection("Food");
  };

  return (
    <div>
      <h2>Electricity</h2>
      <label>Electricity Bill ($):</label>
      <input type="number" onChange={(e) => setElectricityBill(e.target.value)} />

      <button onClick={handleNext}>Next</button>
      <button onClick={() => setActiveSection("Transport")}>Previous</button>
    </div>
  );
};

export default Electricity;
