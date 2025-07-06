import React from "react";
import type { Question, Answer } from "../types";
import { Repeat } from "lucide-react"; // Eliminadas importaciones no usadas

// El tipo para las respuestas que vienen de App.tsx
interface AnswerResult {
  userAnswer: Answer;
  isCorrect: boolean;
}

interface ResultsProps {
  questions: Question[];
  answers: AnswerResult[]; // El tipo de 'answers' se ha actualizado
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, answers, onRestart }) => {
  // La lógica para contar respuestas correctas ahora es más simple
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;

  const score =
    questions.length > 0
      ? Math.round((correctAnswers / questions.length) * 100)
      : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center transition-all duration-500">
      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        ¡Test Completado!
      </h2>
      <p className="text-gray-600 mb-6">Estos son tus resultados.</p>

      <div className="my-8">
        <div
          className={`text-7xl font-bold ${
            score >= 70 ? "text-green-500" : "text-amber-500"
          }`}
        >
          {score}%
        </div>
        <div className="text-xl text-gray-700 mt-2">
          ({correctAnswers} de {questions.length} respuestas correctas)
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out inline-flex items-center"
      >
        <Repeat className="mr-2 h-5 w-5" />
        Volver a Intentar
      </button>
    </div>
  );
};

export default Results;
