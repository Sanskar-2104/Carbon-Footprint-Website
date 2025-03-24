import React from "react";
import { Utensils } from "lucide-react";
import QuizSection from "./QuizSection";

const Food = () => {
  return (
    <QuizSection
      icon={Utensils}
      title="Food Consumption"
      question="What type of food did you consume today?"
      options={[
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Non-Vegetarian", value: "non-vegetarian" },
        { label: "Vegan", value: "vegan" },
      ]}
      followUp={{
        showFor: "non-vegetarian", // Show follow-up question only for Non-Vegetarian
        question: "How much did you spend on non-veg food today? (Rs)",
      }}
    />
  );
};

export default Food;
