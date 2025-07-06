// src/components/QuestionDisplay.tsx
import React, { useEffect, useState } from "react";
import {
  AnyQuestion,
  MultipleChoiceQuestion,
  OrderingQuestion,
} from "../types";
import MultipleChoice from "./questionTypes/MultipleChoice";
import TextInput from "./questionTypes/TextInput";
import Ordering from "./questionTypes/Ordering";

interface Props {
  question: AnyQuestion;
  onAnswer: (answer: string | string[]) => void;
}

const QuestionDisplay: React.FC<Props> = ({ question, onAnswer }) => {
  // Se añade una 'key' para forzar que el componente se vuelva a montar cuando
  // la pregunta cambia, asegurando que el estado interno se reinicie.
  const [key, setKey] = useState(question.id);
  useEffect(() => {
    setKey(question.id);
  }, [question]);

  const renderQuestion = () => {
    // Se actualiza el switch para que coincida con los nuevos tipos de pregunta (ej: 'multiple-choice')
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
        // Este es el error que estabas viendo.
        return <p>Error: Tipo de pregunta no reconocido.</p>;
    }
  };

  return (
    <div key={key} className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 text-center">
        {question.text}
      </h2>
      {renderQuestion()}
    </div>
  );
};

export default QuestionDisplay;
