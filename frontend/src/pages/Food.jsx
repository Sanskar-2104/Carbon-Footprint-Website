// import React from "react";
// import { Utensils } from "lucide-react";
// import QuizSection from "./QuizSection";

// const Food = () => {
//   return (
//     <QuizSection
//       icon={Utensils}
//       title="Food Consumption"
//       question="What type of food did you consume today?"
//       options={[
//         { label: "Vegetarian", value: "vegetarian" },
//         { label: "Non-Vegetarian", value: "non-vegetarian" },
//         { label: "Vegan", value: "vegan" },
//       ]}
//       followUp={{
//         showFor: ["non-vegetarian"], // Show follow-up question only for Non-Vegetarian
//         question: "How much did you spend on non-veg food today? (Rs)",
//       }}
//     />
//   );
// };

// export default Food;




// import React, { useState } from "react";
// import { useUserInput } from "../context/UserInputContext";

// const Food = ({ setActiveSection }) => {
//   const { updateUserData } = useUserInput();

//   const [foodChoice, setFoodChoice] = useState("vegetarian");

//   const handleNext = () => {
//     updateUserData("food", { food: foodChoice }); // Store as an object with key
//     setActiveSection("Result");
//   };
  

//   return (
//     <div>
//       <h2>Food</h2>
//       <label>What type of food do you consume most?</label>
//       <select value={foodChoice} onChange={(e) => setFoodChoice(e.target.value)}>
//         <option value="vegetarian">Vegetarian</option>
//         <option value="non_vegetarian">Non-Vegetarian</option>
//         <option value="vegan">Vegan</option>
//       </select>

//       <button onClick={handleNext}>Next</button>
//       <button onClick={() => setActiveSection("Electricity")}>Previous</button>
//     </div>
//   );
// };

// export default Food;





import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";
import { Utensils } from "lucide-react"; // Icon for food
import QuizSection from "./QuizSection";

const Food = ({ setActiveSection }) => {
  const foodQuestions = [
    {
      key: "meatFrequency",
      question: "When planning meals for the week, how often do you include meat?",
      options: [
        { label: "Meat in every meal (4+ times a day)", value: "4+" },
        { label: "Meat in most meals (2-3 times a day)", value: "2-3" },
        { label: "Meat once a day", value: "1" },
        { label: "Meat a few times a week", value: "few" },
        { label: "Never eat meat", value: "never" },
      ],
    },
    {
      key: "meatLover",
      question: "How many times do you have meat in your meals per week?",
      inputField: true, // Number input
      showFor: ["4+"], // Show only if "4+" is selected
    },
    {
      key: "dairyFrequency",
      question: "How often do you consume dairy products like milk, cheese, or butter?",
      options: [
        { label: "Multiple times a day", value: "multiple" },
        { label: "Once a day", value: "daily" },
        { label: "A few times a week", value: "few" },
        { label: "Never", value: "never" },
      ],
    },
    {
      key: "restaurantChoice",
      question: "You’re ordering food at a restaurant. What do you usually pick?",
      options: [
        { label: "A steak or lamb-heavy dish", value: "steak" },
        { label: "Chicken or fish-based dish", value: "chicken_fish" },
        { label: "A vegetarian meal with some dairy", value: "vegetarian" },
        { label: "A fully plant-based dish", value: "vegan" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { userData } = useUserInput();

  const handleNext = () => {
    let nextIndex = currentQuestionIndex + 1;
    while (
      nextIndex < foodQuestions.length &&
      foodQuestions[nextIndex].showFor &&
      !foodQuestions[nextIndex].showFor.includes(userData.food?.meatFrequency)
    ) {
      nextIndex++; // Skip hidden questions
    }
    if (nextIndex < foodQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setActiveSection("Result"); // Move to the Result page
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentQuestionIndex - 1;
    while (
      prevIndex >= 0 &&
      foodQuestions[prevIndex].showFor &&
      !foodQuestions[prevIndex].showFor.includes(userData.food?.meatFrequency)
    ) {
      prevIndex--; // Skip hidden questions
    }
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    } else {
      setActiveSection("Electricity"); // Move back to Electricity
    }
  };

  // Check if the current question should be shown based on previous answers
  const currentQuestion = foodQuestions[currentQuestionIndex];
  if (currentQuestion.showFor && !currentQuestion.showFor.includes(userData.food?.meatFrequency)) {
    handleNext(); // Skip the question if it shouldn't be shown
    return null;
  }

  return (
    <QuizSection
      icon={Utensils}
      title="Food"
      question={currentQuestion.question}
      options={currentQuestion.options || []} // Handle cases where there are no options
      category="food"
      field={currentQuestion.key}
      followUp={currentQuestion.inputField ? { showFor: [true], question: currentQuestion.question } : null}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Food;
