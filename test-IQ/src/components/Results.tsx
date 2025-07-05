import React from "react";
import type { Answer } from "../types"; // Importación de tipo corregida

interface ResultsProps {
  answers: Answer[];
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  answers,
  totalQuestions,
  onRestart,
}) => {
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const scorePercentage = correctAnswers / totalQuestions;

  const calculateIQ = (percentage: number): number => {
    if (percentage < 0.5) {
      return Math.round(70 + (percentage / 0.5) * 30);
    } else {
      return Math.round(100 + ((percentage - 0.5) / 0.5) * 30);
    }
  };

  const iqScore = calculateIQ(scorePercentage);

  const getClassification = (
    iq: number
  ): { classification: string; description: string } => {
    if (iq >= 130)
      return {
        classification: "Muy Superior",
        description:
          "Tu rendimiento se encuentra en el 2% superior de la población.",
      };
    if (iq >= 120)
      return {
        classification: "Superior",
        description:
          "Demuestras una capacidad cognitiva notablemente por encima del promedio.",
      };
    if (iq >= 110)
      return {
        classification: "Promedio Alto",
        description: "Tus habilidades cognitivas están por encima de la media.",
      };
    if (iq >= 90)
      return {
        classification: "Promedio",
        description:
          "Te encuentras dentro del rango de la mayoría de la población.",
      };
    if (iq >= 80)
      return {
        classification: "Promedio Bajo",
        description:
          "Tus habilidades cognitivas están ligeramente por debajo de la media.",
      };
    if (iq >= 70)
      return {
        classification: "Límite (Borderline)",
        description:
          "Tu rendimiento se encuentra en el extremo inferior del rango promedio.",
      };
    return {
      classification: "Extremadamente Bajo",
      description:
        "Sería recomendable una evaluación más profunda por un profesional.",
    };
  };

  const { classification, description } = getClassification(iqScore);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">
        Resultados del Test
      </h2>
      <p className="text-gray-300 mb-2 text-lg">
        Has respondido correctamente {correctAnswers} de {totalQuestions}{" "}
        preguntas.
      </p>

      <div className="my-8">
        <p className="text-gray-400 text-xl">
          Tu puntuación de CI estimada es:
        </p>
        <p className="text-7xl font-bold text-yellow-400 my-4">{iqScore}</p>
        <p className="text-2xl font-semibold text-cyan-400">{classification}</p>
        <p className="text-gray-300 mt-2 max-w-md mx-auto">{description}</p>
      </div>

      <div className="text-left bg-gray-900 p-4 rounded-lg mt-8">
        <h4 className="font-bold text-lg mb-2 text-gray-200">
          Aclaración Importante:
        </h4>
        <p className="text-sm text-gray-400">
          Este test es una simulación educativa y de entretenimiento basada en
          los principios de la psicometría. La puntuación de CI es una
          estimación y no reemplaza una evaluación clínica realizada por un
          psicólogo profesional. Un test real requiere una estandarización y
          baremación rigurosa con una muestra poblacional representativa.
        </p>
      </div>

      <button
        onClick={onRestart}
        className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"
      >
        Realizar el Test de Nuevo
      </button>
    </div>
  );
};

export default Results;
