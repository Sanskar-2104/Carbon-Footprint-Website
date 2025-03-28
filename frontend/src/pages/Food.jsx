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




import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";

const Food = ({ setActiveSection }) => {
  const { updateUserData } = useUserInput();

  const [foodChoice, setFoodChoice] = useState("vegetarian");

  const handleNext = () => {
    updateUserData("food", { food: foodChoice }); // Store as an object with key
    setActiveSection("Result");
  };
  

  return (
    <div>
      <h2>Food</h2>
      <label>What type of food do you consume most?</label>
      <select value={foodChoice} onChange={(e) => setFoodChoice(e.target.value)}>
        <option value="vegetarian">Vegetarian</option>
        <option value="non_vegetarian">Non-Vegetarian</option>
        <option value="vegan">Vegan</option>
      </select>

      <button onClick={handleNext}>Next</button>
      <button onClick={() => setActiveSection("Electricity")}>Previous</button>
    </div>
  );
};

export default Food;
