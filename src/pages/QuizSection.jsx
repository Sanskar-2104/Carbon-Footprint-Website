import React, { useState } from "react";
import "./QuizSection.css";

const QuizSection = ({ icon: Icon, title, question, options, followUp }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [followUpValue, setFollowUpValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFollowUpValue(""); // Reset follow-up input when changing main option
  };

  return (
    <div className="quiz-content">
      <div className="quiz-header">
        <Icon size={40} className="icon" />
        <h2>{title}</h2>
      </div>
      <hr />

      <p className="question">{question}</p>

      <div className="options">
        {options.map((option, index) => (
          <label className="option" key={index}>
            <input
              type="radio"
              name="quiz"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleOptionChange}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Conditionally show follow-up question if criteria match */}
      {followUp && selectedOption === followUp.showFor && (
        <div className="follow-up">
          <p className="question">{followUp.question}</p>
          <div className="fuel-input">
            <span>Rs</span>
            <input
              type="number"
              value={followUpValue}
              onChange={(e) => setFollowUpValue(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
        </div>
      )}

      <button className="calculate-btn">Calculate & Add</button>
    </div>
  );
};

export default QuizSection;
