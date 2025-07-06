import React from "react";
import { Question, Answer } from "../types";
import { CheckCircle, XCircle, Repeat } from "lucide-react";

interface ResultsProps {
  questions: Question[];
  answers: Answer[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, answers, onRestart }) => {
  const correctAnswers = answers.filter((answer, index) => {
    const question = questions[index];
    if (Array.isArray(answer) && Array.isArray(question.answer)) {
      return JSON.stringify(answer) === JSON.stringify(question.answer);
    }
    return answer === question.answer;
  }).length;

  const score = Math.round((correctAnswers / questions.length) * 100);

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
