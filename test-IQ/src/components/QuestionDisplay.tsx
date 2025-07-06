// src/components/QuestionDisplay.tsx
import React, { useEffect, useState } from "react";
// Se corrige la ruta de importación para los tipos, asumiendo que está dos niveles arriba.
import {
  AnyQuestion,
  MultipleChoiceQuestion,
  OrderingQuestion,
} from "../types";

interface Props {
  question: AnyQuestion;
  onAnswer: (answer: string | string[]) => void;
}

const QuestionDisplay: React.FC<Props> = ({ question, onAnswer }) => {
  // Esta 'key' fuerza al componente a reiniciarse cuando cambia la pregunta,
  // lo que evita que se muestren estados de preguntas anteriores.
  const [key, setKey] = useState(question.id);
  useEffect(() => {
    setKey(question.id);
  }, [question]);

  const renderQuestion = () => {
    // Usamos los tipos de pregunta con guion, como están definidos en los datos
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoice
            question={question as MultipleChoiceQuestion}
            onAnswer={onAnswer}
          />
        );
      case "text-input":
        // Ya no necesitamos 'isTimed' ni pasar 'question' a TextInput
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
    <div key={key} className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 text-center">
        {question.text}
      </h2>

      {/* Lógica para mostrar imagen si existe en la pregunta */}
      {"image" in question && question.image && (
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
