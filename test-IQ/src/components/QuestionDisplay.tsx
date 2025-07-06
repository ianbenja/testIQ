// src/components/QuestionDisplay.tsx
import React, { useEffect, useState } from "react";
import type {
  AnyQuestion,
  MultipleChoiceQuestion,
  OrderingQuestion,
} from "../types";
import { Timer } from "lucide-react";
import MultipleChoice from "./questionTypes/MultipleChoice";
import TextInput from "./questionTypes/TextInput";
import Ordering from "./questionTypes/Ordering";

interface Props {
  question: AnyQuestion;
  onAnswer: (answer: string | string[]) => void;
}

const QuestionDisplay: React.FC<Props> = ({ question, onAnswer }) => {
  const [phase, setPhase] = useState<"memorizing" | "answering">("answering");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (question.memorizationTime && question.stimulus) {
      setPhase("memorizing");
      setTimeLeft(question.memorizationTime);
    } else {
      setPhase("answering");
      setTimeLeft(0);
    }
  }, [question]);

  useEffect(() => {
    if (phase === "memorizing" && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
    if (phase === "memorizing" && timeLeft === 0) {
      setPhase("answering");
    }
  }, [phase, timeLeft]);

  if (phase === "memorizing") {
    const progress = (timeLeft / (question.memorizationTime || 1)) * 100;
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg animate-fade-in">
        <h3 className="text-2xl font-display font-semibold text-textPrimary mb-4">
          ¡Memoriza!
        </h3>
        <div className="bg-white p-8 rounded-lg shadow-inner mb-6">
          <p className="text-4xl font-bold text-primary tracking-wider font-mono">
            {question.stimulus}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg text-textSecondary">
          <Timer className="h-6 w-6" />
          <span>Tiempo restante: {timeLeft}s</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-1000 linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoice
            question={question as MultipleChoiceQuestion}
            onAnswer={onAnswer}
          />
        );
      case "text-input":
        return <TextInput onAnswer={onAnswer} />;
      case "ordering":
        return (
          <Ordering
            question={question as OrderingQuestion}
            onAnswer={onAnswer}
          />
        );
      default:
        return <p>Error: Tipo de pregunta no reconocido.</p>;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-textPrimary mb-6 text-center">
        {question.text}
      </h2>

      {question.image && (
        <div className="my-4 flex justify-center">
          <img
            src={question.image}
            alt={`Visual para la pregunta: ${question.text}`}
            className="rounded-lg max-w-sm w-full shadow-md"
          />
        </div>
      )}

      <div className="w-full mt-4">{renderQuestion()}</div>
    </div>
  );
};

export default QuestionDisplay;
