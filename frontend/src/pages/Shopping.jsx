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


// import React, { useState, useEffect } from "react";
// import { ShoppingBag } from "lucide-react";
// import QuizSection from "./QuizSection";
// import { useUserInput } from "../context/UserInputContext"; // Import context

// const Shopping = ({ setActiveSection }) => {
//   const { userData, updateUserData } = useUserInput();

//   const questions = [
//     {
//       key: "shoppingAmount",
//       question: "How much money did you spend on shopping today?",
//       options: [
//         { label: "$10", value: "low" },
//         { label: "$20", value: "medium" },
//         { label: "More than $100", value: "high" },
//       ],
//     },
//     {
//       key: "shoppingType",
//       question: "What type of products did you buy?",
//       options: [
//         { label: "Clothing", value: "clothing" },
//         { label: "Electronics", value: "electronics" },
//         { label: "Groceries", value: "groceries" },
//       ],
//     },
//     {
//       key: "ecoFriendly",
//       question: "Did you buy eco-friendly products?",
//       options: [
//         { label: "Yes", value: "true" },
//         { label: "No", value: "false" },
//       ],
//     },
//   ];

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Load existing shopping data from context
//   useEffect(() => {
//     const handleEvent = () => console.log("Event triggered");
//     document.addEventListener("click", handleEvent);
    
//     return () => {
//       document.removeEventListener("click", handleEvent);
//     };
//   }, []);
  

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
//       category="shopping" // Pass correct category
//       field={questions[currentQuestionIndex].key} // Pass correct field
//       onNext={handleNext}
//       onPrevious={handlePrevious}
//     />
//   );
// };

// export default Shopping;





import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";
import { ShoppingBag } from "lucide-react";
import QuizSection from "./QuizSection";

const Shopping = ({ setActiveSection }) => {
  const shoppingQuestions = [
    {
      key: "purchaseCategory",
      question: "What did you buy today?",
      options: [
        { label: "Small Items & Clothing", value: "small_clothing" },
        { label: "Electronics (Small & Medium)", value: "electronics" },
        { label: "Home Goods & Large Appliances", value: "home_goods" },
      ],
    },
    {
      key: "shoppingFrequency",
      question: "How often do you buy small personal items like books, stationery, or accessories?",
      options: [
        { label: "Rarely (once a year or less)", value: "rarely" },
        { label: "Occasionally (every few months)", value: "occasionally" },
        { label: "Frequently (monthly or more)", value: "frequently" },
      ],
      showFor: ["small_clothing"],
    },
    {
      key: "clothingPurchase",
      question: "How often do you purchase new clothing items (e.g., T-shirts, jeans, shoes)?",
      options: [
        { label: "Rarely (a few times a year)", value: "rarely" },
        { label: "Occasionally (once every 1-2 months)", value: "occasionally" },
        { label: "Frequently (every month or more)", value: "frequently" },
      ],
      showFor: ["small_clothing"],
    },
    {
      key: "electronicsReplacement",
      question: "How often do you replace small electronics (e.g., headphones, smartwatches)?",
      options: [
        { label: "Rarely (only when broken)", value: "rarely" },
        { label: "Every 1-2 years", value: "1-2 years" },
        { label: "Frequently (every year or more)", value: "frequently" },
      ],
      showFor: ["electronics"],
    },
    {
      key: "mediumElectronics",
      question: "How often do you buy or upgrade medium electronics (e.g., laptops, TVs)?",
      options: [
        { label: "Rarely (every 4-5 years or more)", value: "rarely" },
        { label: "Occasionally (every 2-3 years)", value: "occasionally" },
        { label: "Frequently (every year or more)", value: "frequently" },
      ],
      showFor: ["electronics"],
    },
    {
      key: "homeFurniture",
      question: "How often do you purchase new home furniture (e.g., tables, chairs, beds)?",
      options: [
        { label: "Rarely (every 5 years or more)", value: "rarely" },
        { label: "Occasionally (every 2-4 years)", value: "occasionally" },
        { label: "Frequently (every year or more)", value: "frequently" },
      ],
      showFor: ["home_goods"],
    },
    {
      key: "applianceReplacement",
      question: "How often do you replace large appliances (e.g., refrigerators, washing machines)?",
      options: [
        { label: "Only when broken", value: "when broken" },
        { label: "Every 5-10 years", value: "5-10 years" },
        { label: "Every 3-5 years", value: "3-5 years" },
      ],
      showFor: ["home_goods"],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { userData } = useUserInput();

  const handleNext = () => {
    let nextIndex = currentQuestionIndex + 1;
    while (
      nextIndex < shoppingQuestions.length &&
      shoppingQuestions[nextIndex].showFor &&
      !shoppingQuestions[nextIndex].showFor.includes(
        userData.shopping?.[shoppingQuestions[nextIndex].dependsOn] || userData.shopping?.purchaseCategory
      )
    ) {
      nextIndex++; // Skip hidden questions
    }
    if (nextIndex < shoppingQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setActiveSection("Transport"); // Move to next section
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentQuestionIndex - 1;
    while (
      prevIndex >= 0 &&
      shoppingQuestions[prevIndex].showFor &&
      !shoppingQuestions[prevIndex].showFor.includes(
        userData.shopping?.[shoppingQuestions[prevIndex].dependsOn] || userData.shopping?.purchaseCategory
      )
    ) {
      prevIndex--; // Skip hidden questions
    }
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    } else {
      setActiveSection("Home"); // Move back to Home
    }
  };

  const currentQuestion = shoppingQuestions[currentQuestionIndex];
  if (
    currentQuestion.showFor &&
    !currentQuestion.showFor.includes(userData.shopping?.[currentQuestion.dependsOn] || userData.shopping?.purchaseCategory)
  ) {
    handleNext(); // Skip the question if it shouldn't be shown
    return null;
  }

  return (
    <QuizSection
      icon={ShoppingBag}
      title="Shopping"
      question={currentQuestion.question}
      options={currentQuestion.options || []}
      category="shopping"
      field={currentQuestion.key}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Shopping;
