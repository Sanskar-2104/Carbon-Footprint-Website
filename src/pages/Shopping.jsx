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


import React from "react";
import { ShoppingBag } from "lucide-react";
import QuizSection from "./QuizSection";

const Shopping = () => {
  return (
    <QuizSection
      icon={ShoppingBag}
      title="Shopping"
      question="How much money did you spend on shopping today?"
      options={[
        { label: "Less than $20", value: "low" },
        { label: "$20 - $100", value: "medium" },
        { label: "More than $100", value: "high" },
      ]}
    />
  );
};

export default Shopping;
