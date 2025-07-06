// src/components/Results.tsx
import React from "react";
import type { AnswerResult, AnyQuestion } from "../types";
import { Repeat, Clock, BarChart2 } from "lucide-react";

// (La función calculateIQ permanece igual)
const calculateIQ = (
  answers: AnswerResult[],
  questions: AnyQuestion[],
  totalTime: number
): number => {
  if (answers.length === 0 || questions.length === 0) {
    return 80;
  }
  const accuracyScore = answers.reduce((sum, answer) => {
    return answer.isCorrect ? sum + answer.difficulty : sum;
  }, 0);
  const averageTimePerQuestion = 20;
  const expectedTime = questions.length * averageTimePerQuestion;
  const actualTime = totalTime / 1000;
  const timeFactor = Math.max(0.75, Math.min(1.25, expectedTime / actualTime));
  const userRawScore = accuracyScore * timeFactor;
  const maxPossibleRawScore =
    questions.reduce((sum, q) => sum + q.difficulty, 0) * 1.25;
  const populationMean = maxPossibleRawScore * 0.5;
  const populationStdDev = maxPossibleRawScore * 0.15;
  const zScore =
    populationStdDev > 0
      ? (userRawScore - populationMean) / populationStdDev
      : 0;
  const estimatedIQ = 100 + zScore * 15;
  return Math.round(Math.max(55, Math.min(160, estimatedIQ)));
};

const CategoryStat = ({
  name,
  correct,
  total,
  color,
}: {
  name: string;
  correct: number;
  total: number;
  color: string;
}) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-textPrimary">{name}</h4>
        <p className="text-textSecondary font-medium">
          {correct}/{total}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="h-2.5 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

interface ResultsProps {
  answers: AnswerResult[];
  allQuestions: AnyQuestion[];
  onRestart: () => void;
  totalTime: number;
}

const Results: React.FC<ResultsProps> = ({
  answers,
  allQuestions,
  onRestart,
  totalTime,
}) => {
  const estimatedIQ = calculateIQ(answers, allQuestions, totalTime);

  let iqColor = "text-primary";
  let iqDescription = "Promedio";
  if (estimatedIQ >= 130) {
    iqColor = "text-purple-600";
    iqDescription = "Muy Superior";
  } else if (estimatedIQ >= 120) {
    iqColor = "text-green-500";
    iqDescription = "Superior";
  } else if (estimatedIQ >= 110) {
    iqColor = "text-teal-500";
    iqDescription = "Normal-Alto";
  } else if (estimatedIQ < 90) {
    iqColor = "text-orange-500";
    iqDescription = "Normal-Bajo";
  }

  const categoryStats = allQuestions.reduce((acc, question) => {
    const category = question.category;
    if (!acc[category]) acc[category] = { correct: 0, total: 0 };
    acc[category].total++;
    if (answers.find((a) => a.questionId === question.id)?.isCorrect) {
      acc[category].correct++;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const categoryColors: { [key: string]: string } = {
    "Razonamiento Fluido": "#8B5CF6",
    "Comprensión Verbal": "#10B981",
    "Memoria de Trabajo": "#3B82F6",
    "Conocimiento Cuantitativo": "#F59E0B",
    "Procesamiento Visoespacial": "#EF4444",
  };

  return (
    <div className="bg-surface rounded-2xl p-8 text-center animate-fade-in">
      <h2 className="text-5xl font-display font-bold text-textPrimary mb-2">
        ¡Test Completado!
      </h2>

      <div className="my-8">
        <div className="text-xl text-textSecondary mb-2 font-display">
          CI Estimado
        </div>
        <div className={`text-8xl font-bold ${iqColor}`}>{estimatedIQ}</div>
        <div className={`text-2xl font-medium mt-2 ${iqColor}`}>
          {iqDescription}
        </div>
        <div className="flex items-center justify-center gap-2 text-textSecondary mt-4">
          <Clock size={16} />
          <span>
            Tiempo total: {new Date(totalTime).toISOString().slice(14, 19)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
          Nota: Este es un cálculo simplificado y no reemplaza una evaluación
          psicométrica profesional.
        </p>
      </div>

      <div className="my-10 text-left">
        <h3 className="text-3xl font-display font-bold text-textPrimary mb-6 text-center flex items-center justify-center gap-2">
          <BarChart2 />
          Desglose por Habilidad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryStats).map(([name, stats]) => (
            <CategoryStat
              key={name}
              name={name}
              correct={stats.correct}
              total={stats.total}
              color={categoryColors[name] || "#6B7280"}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-primary text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:bg-primary-dark"
      >
        <Repeat className="mr-2 h-5 w-5 inline" />
        Volver a Intentar
      </button>
    </div>
  );
};

export default Results;
