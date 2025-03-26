// import React, { useState } from "react";
// import "./Shopping.css";
// import { ShoppingBag } from "lucide-react";

// const Shopping = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div className="shopping-content">
//       <div className="shopping-header">
//         <ShoppingBag size={40} className="icon" />
//         <h2>Shopping & Carbon Footprint</h2>
//       </div>
//       <hr />

//       <p className="question">How much money did you spend on shopping today?</p>

//       <div className="options">
//         <label className="option">
//           <input
//             type="radio"
//             name="shopping"
//             value="low"
//             checked={selectedOption === "low"}
//             onChange={handleOptionChange}
//           />
//           Less than $20
//         </label>

//         <label className="option">
//           <input
//             type="radio"
//             name="shopping"
//             value="medium"
//             checked={selectedOption === "medium"}
//             onChange={handleOptionChange}
//           />
//           $20 - $100
//         </label>

//         <label className="option">
//           <input
//             type="radio"
//             name="shopping"
//             value="high"
//             checked={selectedOption === "high"}
//             onChange={handleOptionChange}
//           />
//           More than $100
//         </label>
//       </div>

//       <button className="calculate-btn">Calculate & Add</button>
//     </div>
//   );
// };

// export default Shopping;


// import React from "react";
// import { ShoppingBag } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Shopping = () => {
//   return (
//     <QuizSection
//       icon={ShoppingBag}
//       title="Shopping"
//       question="How much money did you spend on shopping today?"
//       options={[
//         { label: "Less than $20", value: "low" },
//         { label: "$20 - $100", value: "medium" },
//         { label: "More than $100", value: "high" },
//       ]}
//     />
//   );
// };

// export default Shopping;


// import React, { useState } from "react";
// import { ShoppingBag } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Shopping = ({ setActiveSection }) => {
//   // Define questions for the Shopping section
//   const questions = [
//     {
//       question: "How much money did you spend on shopping today?",
//       options: [
//         { label: "Less than $20", value: "low" },
//         { label: "$20 - $100", value: "medium" },
//         { label: "More than $100", value: "high" },
//       ],
//     },
//     {
//       question: "What type of products did you buy?",
//       options: [
//         { label: "Clothing", value: "clothing" },
//         { label: "Electronics", value: "electronics" },
//         { label: "Groceries", value: "groceries" },
//       ],
//     },
//     {
//       question: "Did you buy eco-friendly products?",
//       options: [
//         { label: "Yes", value: "yes" },
//         { label: "No", value: "no" },
//       ],
//       followUp: {
//         showFor: ["no"], // Show follow-up only if "No" is selected
//         question: "Would you consider buying eco-friendly products in the future?",
//       },
//     },
//   ];

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setActiveSection("Transport"); // Move to next section
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else {
//       setActiveSection("Home"); // Go back to Home
//     }
//   };

//   return (
//     <QuizSection
//       icon={ShoppingBag}
//       title="Shopping"
//       question={questions[currentQuestionIndex].question}
//       options={questions[currentQuestionIndex].options}
//       followUp={questions[currentQuestionIndex].followUp} // Pass follow-up question dynamically
//       onNext={handleNext}
//       onPrevious={handlePrevious}
//     />
//   );
// };

// export default Shopping;


// import React, { useState } from "react";
// import { ShoppingBag } from "lucide-react";
// import QuizSection from "./QuizSection";
// import { useUserInput } from "../context/UserInputContext"; // Import Context Hook

// const Shopping = ({ setActiveSection }) => {
//   const { updateUserData } = useUserInput(); // Get function to update data

//   const questions = [
//     {
//       question: "How much money did you spend on shopping today?",
//       options: [
//         { label: "Less than $20", value: "low" },
//         { label: "$20 - $100", value: "medium" },
//         { label: "More than $100", value: "high" },
//       ],
//     },
//     {
//       question: "What type of products did you buy?",
//       options: [
//         { label: "Clothing", value: "clothing" },
//         { label: "Electronics", value: "electronics" },
//         { label: "Groceries", value: "groceries" },
//       ],
//     },
//     {
//       question: "Did you buy eco-friendly products?",
//       options: [
//         { label: "Yes", value: "yes" },
//         { label: "No", value: "no" },
//       ],
//       followUp: {
//         showFor: ["no"],
//         question: "Would you consider buying eco-friendly products in the future?",
//       },
//     },
//   ];

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const handleAnswerSelect = (question, answer) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [question]: answer,
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       updateUserData("shopping", answers); // Save data to context
//       setActiveSection("Transport");
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else {
//       setActiveSection("Home");
//     }
//   };

//   return (
//     <QuizSection
//       icon={ShoppingBag}
//       title="Shopping"
//       question={questions[currentQuestionIndex].question}
//       options={questions[currentQuestionIndex].options}
//       followUp={questions[currentQuestionIndex].followUp}
//       onSelectAnswer={handleAnswerSelect}
//       onNext={handleNext}
//       onPrevious={handlePrevious}
//     />
//   );
// };

// export default Shopping;


import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import QuizSection from "./QuizSection";
import { useUserInput } from "../context/UserInputContext"; // Import context

const Shopping = ({ setActiveSection }) => {
  const { userData, updateUserData } = useUserInput(); // Access context functions

  const [shoppingData, setShoppingData] = useState({
    shoppingAmount: "",
    shoppingType: "",
    ecoFriendly: "",
  });

  const questions = [
    {
      key: "shoppingAmount",
      question: "How much money did you spend on shopping today?",
      options: [
        { label: "$10", value: "low" },
        { label: "$20", value: "medium" },
        { label: "More than $100", value: "high" },
      ],
    },
    {
      key: "shoppingType",
      question: "What type of products did you buy?",
      options: [
        { label: "Clothing", value: "clothing" },
        { label: "Electronics", value: "electronics" },
        { label: "Groceries", value: "groceries" },
      ],
    },
    {
      key: "ecoFriendly",
      question: "Did you buy eco-friendly products?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load existing shopping data from context
  useEffect(() => {
    if (userData.shopping) {
      setShoppingData(userData.shopping);
    }
  }, [userData.shopping]);

  const handleAnswerSelect = (value) => {
    const key = questions[currentQuestionIndex].key;
    const updatedData = { ...shoppingData, [key]: value };

    setShoppingData(updatedData);
    updateUserData("shopping", updatedData); // Save data to context immediately
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setActiveSection("Transport"); // Move to the next section
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setActiveSection("Home"); // Go back to Home
    }
  };

  return (
    <QuizSection
      icon={ShoppingBag}
      title="Shopping"
      question={questions[currentQuestionIndex].question}
      options={questions[currentQuestionIndex].options}
      selectedAnswer={shoppingData[questions[currentQuestionIndex].key]} // Show selected option
      onSelectAnswer={handleAnswerSelect} // Save answer
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Shopping;
