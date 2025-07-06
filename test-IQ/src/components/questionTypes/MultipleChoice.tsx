import React, { useState } from "react";
import { Question } from "../../types";

interface MultipleChoiceProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    // Añadimos un pequeño retraso para que el usuario vea la selección antes de pasar a la siguiente pregunta
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null); // Resetea para la siguiente pregunta
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options?.map((option) => {
        const isSelected = selectedOption === option;
        return (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={!!selectedOption}
            className={`
              w-full p-4 rounded-lg border-2 text-left text-lg font-medium
              transition-all duration-200 ease-in-out transform
              ${
                isSelected
                  ? "bg-indigo-600 border-indigo-700 text-white shadow-lg scale-105"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-400"
              }
              ${!!selectedOption && !isSelected ? "opacity-50" : ""}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
