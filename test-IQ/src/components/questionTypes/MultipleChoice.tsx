// src/components/questionTypes/MultipleChoice.tsx
import React from "react";
import type { MultipleChoiceQuestion } from "../../types";

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (answer: string) => void;
}

const MultipleChoice: React.FC<Props> = ({ question, onAnswer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          className="bg-surface border-2 border-gray-200 text-textPrimary rounded-lg p-5 text-lg font-medium hover:bg-primary-light hover:border-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;
