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



// import React, { useState } from "react";
// import { useUserInput } from "../context/UserInputContext";

// const Electricity = ({ setActiveSection }) => {
//   const { updateUserData } = useUserInput();

//   const [electricityBill, setElectricityBill] = useState("");

//   const handleNext = () => {
//     updateUserData("energy", { electricityBill });
//     setActiveSection("Food");
//   };

//   return (
//     <div>
//       <h2>Electricity</h2>
//       <label>Electricity Unit :</label>
//       <input type="number" onChange={(e) => setElectricityBill(e.target.value)} />

//       <button onClick={handleNext}>Next</button>
//       <button onClick={() => setActiveSection("Transport")}>Previous</button>
//     </div>
//   );
// };

// export default Electricity;





import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";
import { Bolt } from "lucide-react"; // Icon for electricity
import QuizSection from "./QuizSection";

const Electricity = ({ setActiveSection }) => {
  const electricityQuestions = [
    {
      key: "energyType",
      question: "What type of energy do you use most at home?",
      options: [
        { label: "Fossil fuels (gas, coal, non-renewable electricity)", value: "fossil" },
        { label: "A mix of renewable and non-renewable energy", value: "mixed" },
        { label: "Mostly renewable energy (solar, wind)", value: "renewable" },
      ],
    },
    {
      key: "applianceUsage",
      question: "How often do you use appliances like washing machines, heaters, or ovens?",
      options: [
        { label: "Every day", value: "daily" },
        { label: "A few times a week", value: "fewTimes" },
        { label: "Once a week or less", value: "rarely" },
      ],
    },
    {
      key: "electricityBill",
      question: "Enter your monthly electricity usage (in units):",
      inputField: true, // Takes numeric input
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { userData } = useUserInput();

  const handleNext = () => {
    if (currentQuestionIndex < electricityQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setActiveSection("Food"); // Move to next section
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setActiveSection("Transport"); // Move back to Transport
    }
  };

  // Get current question
  const currentQuestion = electricityQuestions[currentQuestionIndex];

  return (
    <QuizSection
      icon={Bolt}
      title="Electricity"
      question={currentQuestion.question}
      options={currentQuestion.options || []} // Handle cases where there are no options
      category="energy"
      field={currentQuestion.key}
      followUp={currentQuestion.inputField ? { showFor: [true], question: currentQuestion.question } : null}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Electricity;
