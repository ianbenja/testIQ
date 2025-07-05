import React, { useState, useEffect, useRef } from "react";
import type { Question } from "../types"; // Importación de tipo corregida
import MultipleChoice from "./questionTypes/MultipleChoice";
import TextInput from "./questionTypes/TextInput";
import Ordering from "./questionTypes/Ordering";
import ProgressBar from "./ProgressBar";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: string | string[], isCorrect: boolean) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  onAnswer,
  currentIndex,
  totalQuestions,
}) => {
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(5);
  // Corregido: El tipo de retorno de setInterval en el navegador es `number`.
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (
      question.category === "Memoria de Trabajo" &&
      question.type === "text-input"
    ) {
      setShowTimer(true);
      setTimer(5);
      // `setInterval` en el navegador devuelve un número, no un NodeJS.Timeout.
      timerId.current = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      window.setTimeout(() => {
        if (timerId.current) {
          clearInterval(timerId.current);
        }
        setShowTimer(false);
      }, 5000);
    }

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [question]);

  const renderQuestionType = () => {
    switch (question.type) {
      case "multiple-choice":
        return <MultipleChoice question={question} onAnswer={onAnswer} />;
      case "text-input":
        return (
          <TextInput
            question={question}
            onAnswer={onAnswer}
            isTimed={showTimer}
          />
        );
      case "ordering":
        return <Ordering question={question} onAnswer={onAnswer} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full animate-fade-in">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      <div className="mt-6">
        <p className="text-sm font-semibold text-cyan-400 mb-2">
          {question.category}
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">
          {question.category === "Memoria de Trabajo" && showTimer
            ? "Memoriza la secuencia..."
            : question.text}
        </h2>

        {question.image && !showTimer && (
          <div className="my-4 flex justify-center">
            <img
              src={question.image}
              alt="Pregunta visual"
              className="rounded-lg max-w-sm"
            />
          </div>
        )}

        {question.category === "Memoria de Trabajo" && showTimer ? (
          <div className="text-6xl text-center font-bold text-yellow-400 p-8">
            {question.text.split(": ")[1]}
            <div className="text-2xl mt-4">Tiempo restante: {timer}s</div>
          </div>
        ) : (
          <div className="mt-6">{renderQuestionType()}</div>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
