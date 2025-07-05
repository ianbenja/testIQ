import React from "react";
import type { Question } from "../../types"; // Importación de tipo corregida

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option, option === question.correctAnswer)}
          className="bg-gray-700 p-4 rounded-lg text-left text-lg hover:bg-cyan-700 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoice;
