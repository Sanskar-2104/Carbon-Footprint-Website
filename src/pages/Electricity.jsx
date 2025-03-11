import React from "react";
import { Zap } from "lucide-react";
import QuizSection from "./QuizSection";

const Electricity = () => {
  return (
    <QuizSection
      icon={Zap}
      title="Electricity Usage"
      question="How much electricity did you use today?"
      options={[
        { label: "Low (0-5 kWh)", value: "low" },
        { label: "Medium (5-15 kWh)", value: "medium" },
        { label: "High (15+ kWh)", value: "high" },
      ]}
      followUp={{
        showFor: "high", // Show follow-up question only if "High" usage is selected
        question: "What is your electricity bill this month? (Rs)",
      }}
    />
  );
};

export default Electricity;
