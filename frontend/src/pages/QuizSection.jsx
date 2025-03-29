// import React, { useState } from "react";
// import "./QuizSection.css";

// const QuizSection = ({ icon: Icon, title, question, options, followUp }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [followUpValue, setFollowUpValue] = useState("");

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     setFollowUpValue(""); // Reset follow-up input when changing main option
//   };

//   return (
//     <div className="quiz-content">
//       <div className="quiz-header">
//         <Icon size={40} className="icon" />
//         <h2>{title}</h2>
//       </div>
//       <hr />

//       <p className="question">{question}</p>

//       <div className="options">
//         {options.map((option, index) => (
//           <label className="option" key={index}>
//             <input
//               type="radio"
//               name="quiz"
//               value={option.value}
//               checked={selectedOption === option.value}
//               onChange={handleOptionChange}
//             />
//             {option.label}
//           </label>
//         ))}
//       </div>

//       {/* Conditionally show follow-up question if criteria match */}
//       {followUp && selectedOption === followUp.showFor && (
//         <div className="follow-up">
//           <p className="question">{followUp.question}</p>
//           <div className="fuel-input">
//             <span>Rs</span>
//             <input
//               type="number"
//               value={followUpValue}
//               onChange={(e) => setFollowUpValue(e.target.value)}
//               placeholder="Enter amount"
//             />
//           </div>
//         </div>
//       )}

//       <button className="calculate-btn">Calculate & Add</button>
//     </div>
//   );
// };

// export default QuizSection;


// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import "./QuizSection.css";

// const QuizSection = ({ icon: Icon, title, question, options, followUp, onNext, onPrevious }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [followUpValue, setFollowUpValue] = useState("");

//   useEffect(() => {
//     setSelectedOption(""); // Reset selected option when question changes
//     setFollowUpValue(""); // Reset follow-up input
//   }, [question]);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     setFollowUpValue(""); // Reset follow-up input when changing main option
//   };

//   const handleCalculate = () => {
//     if (!selectedOption) {
//       Swal.fire({
//         toast: true,
//         position: "top",
//         icon: "warning",
//         title: "⚠️ Please select an option before calculating!",
//         showConfirmButton: false,
//         timer: 2000,
//         timerProgressBar: true,
//       });
//       return; // Stop execution if no option is selected
//     }

//     Swal.fire({
//       toast: true,
//       position: "top",
//       icon: "success",
//       title: "✅ Your response has been added successfully!",
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//     });

//     console.log("Calculation done for:", selectedOption, followUpValue);
//   };

//   return (
//     <div className="quiz-content">
//       <div className="quiz-header">
//         <Icon size={40} className="icon" />
//         <h2>{title}</h2>
//       </div>
//       <hr />

//       <p className="question">{question}</p>

//       <div className="options">
//         {options.map((option, index) => (
//           <label className="option" key={index}>
//             <input
//               type="radio"
//               name="quiz"
//               value={option.value}
//               checked={selectedOption === option.value}
//               onChange={handleOptionChange}
//             />
//             {option.label}
//           </label>
//         ))}
//       </div>

//       {followUp && Array.isArray(followUp.showFor) && followUp.showFor.includes(selectedOption) && (
//         <div className="follow-up">
//           <p className="question">{followUp.question}</p>
//           <div className="fuel-input">
//             <span></span>
//             <input
//               type="number"
//               value={followUpValue}
//               onChange={(e) => setFollowUpValue(e.target.value)}
//               placeholder="Enter amount"
//             />
//           </div>
//         </div>
//       )}
//       <div className="quiz-buttons">
//         {onPrevious && <button onClick={onPrevious} className="prev-btn">Previous</button>}
//         <button onClick={handleCalculate} className="calculate-btn">
//           Calculate & Add
//         </button>
//         {onNext && <button onClick={onNext} className="next-btn">Next</button>}
//       </div>
//     </div>
//   );
// };

// export default QuizSection;





import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUserInput } from "../context/UserInputContext";
import "./QuizSection.css";

const QuizSection = ({ 
  icon: Icon, 
  title, 
  question, 
  options, 
  category = "", // Ensure category is defined
  field = "", // Ensure field is defined
  onNext, 
  onPrevious 
}) => {
  const { userData, updateUserData } = useUserInput();

  // Get stored value from context
  const storedValue = userData[category]?.[field] || "";
  const [selectedOption, setSelectedOption] = useState(storedValue);

  useEffect(() => {
    setSelectedOption(storedValue || "");
  }, [question, storedValue]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (category && field) {
      updateUserData(category, { [field]: value }); // Save data correctly
    } else {
      console.error("Error: category or field is undefined");
    }
  };

  const handleCalculate = () => {
    if (!selectedOption) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "⚠️ Please select an option before calculating!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      toast: true,
      position: "top",
      icon: "success",
      title: "✅ Your response has been added successfully!",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    console.log("Saved:", category, field, selectedOption);
  };

  return (
    <div className="quiz-content">
      <div className="quiz-header">
        <Icon size={40} className="icon" />
        <h2>{title}</h2>
      </div>
      <hr />

      <p className="question">{question}</p>

      {options.length > 0 ? (
        <div className="options">
          {options.map((option, index) => (
            <label className="option" key={index}>
              <input
                type="radio"
                name={`quiz-${category}`} 
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <div className="follow-up">
          <input
            type="number"
            value={selectedOption}
            onChange={handleOptionChange}
            placeholder="Enter your input"
          />
        </div>
      )}

      <div className="quiz-buttons">
        {onPrevious && <button onClick={onPrevious} className="prev-btn">Previous</button>}
        <button onClick={handleCalculate} className="calculate-btn">
           Calculate & Add
         </button>
        <button onClick={onNext} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default QuizSection;