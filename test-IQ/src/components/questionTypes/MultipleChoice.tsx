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
          className="bg-white border-2 border-gray-300 text-gray-700 rounded-lg p-4 text-lg hover:bg-indigo-100 hover:border-indigo-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;
