import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import QuizSection from './QuizSection';

const Waste = ({ setActiveSection }) => {
  const wasteQuestions = [
    {
      key: 'wasteSeparation',
      question: 'How often do you separate your waste (recyclables vs. general waste)?',
      options: [
        { label: 'Always (I strictly separate plastics, paper, and glass)', value: 'always' },
        { label: 'Sometimes (Only when convenient)', value: 'sometimes' },
        { label: 'Never (Everything goes into one bin)', value: 'never' },
      ],
    },
    {
      key: 'composting',
      question: 'Do you compost your organic/food waste?',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
    {
      key: 'plasticUsage',
      question: 'How often do you use single-use plastics (e.g., plastic bags, straws, cups)?',
      options: [
        { label: 'Rarely (I bring my own bags/bottles)', value: 'rarely' },
        { label: 'Occasionally (A few times a week)', value: 'occasionally' },
        { label: 'Frequently (Every day)', value: 'frequently' },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    let nextIndex = currentQuestionIndex + 1;
    if (nextIndex < wasteQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setActiveSection('Result'); // Move to Result section
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    } else {
      setActiveSection('Food'); // Move back to Food
    }
  };

  const currentQuestion = wasteQuestions[currentQuestionIndex];

  return (
    <QuizSection
      icon={Trash2}
      title="Waste Management"
      question={currentQuestion.question}
      options={currentQuestion.options || []}
      category="waste"
      field={currentQuestion.key}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default Waste;
