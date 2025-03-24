import React from "react";

const Result = () => {
  // Assume we fetch saved answers (replace this with actual logic)
  const shopping = localStorage.getItem("shopping") || "low";
  const transport = localStorage.getItem("transport") || "walking";

  // Sample calculation (you can improve this)
  const calculateFootprint = () => {
    let score = 0;

    if (shopping === "high") score += 10;
    if (shopping === "medium") score += 5;
    if (transport === "car") score += 15;
    if (transport === "public") score += 7;

    return score;
  };

  return (
    <div className="result-container">
      <h2>📊 Your Carbon Footprint Score</h2>
      <p>Your estimated carbon footprint is: {calculateFootprint()} kg CO₂</p>
      <p>Try to reduce your emissions by using eco-friendly choices!</p>
    </div>
  );
};

export default Result;
