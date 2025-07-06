// src/components/Results.tsx
import React from "react";
import type { AnswerResult, AnyQuestion } from "../types";
import { Repeat, Clock } from "lucide-react";

/**
 * Calcula un puntaje de CI estandarizado basado en el rendimiento del usuario.
 * Esta función simula una puntuación normalizada (curva de campana)
 * utilizando la precisión ponderada por dificultad y un factor de tiempo.
 * @param answers - Las respuestas del usuario.
 * @param questions - El subconjunto de 20 preguntas que el usuario respondió.
 * @param totalTime - El tiempo total en milisegundos que tardó el test.
 * @returns Un puntaje de CI estandarizado y redondeado.
 */
const calculateIQ = (
  answers: AnswerResult[],
  questions: AnyQuestion[],
  totalTime: number
): number => {
  if (answers.length === 0 || questions.length === 0) {
    return 80; // Devuelve un valor base si no hay datos.
  }

  // --- Paso 1: Calcular el puntaje bruto de rendimiento del usuario ---

  // Puntuación basada en la dificultad de las respuestas correctas.
  const accuracyScore = answers.reduce((sum, answer) => {
    return answer.isCorrect ? sum + answer.difficulty : sum;
  }, 0);

  // Factor de rendimiento basado en el tiempo.
  // Se establece un tiempo "promedio" esperado para el test (ej. 20 segundos por pregunta).
  const averageTimePerQuestion = 20;
  const expectedTime = questions.length * averageTimePerQuestion;
  const actualTime = totalTime / 1000;

  // El factor de tiempo recompensa la velocidad. Se limita entre 0.75 (lento) y 1.25 (rápido)
  // para evitar que el tiempo tenga un impacto desproporcionado.
  const timeFactor = Math.max(0.75, Math.min(1.25, expectedTime / actualTime));

  // El puntaje bruto final combina la precisión ponderada y el factor de tiempo.
  const userRawScore = accuracyScore * timeFactor;

  // --- Paso 2: Estandarizar el puntaje contra una población hipotética ---

  // Se definen los parámetros de la distribución normal (curva de campana) de la población.
  const maxPossibleRawScore =
    questions.reduce((sum, q) => sum + q.difficulty, 0) * 1.25;

  // La MEDIA de la población se establece en el 50% del puntaje bruto máximo posible.
  const populationMean = maxPossibleRawScore * 0.5;

  // La DESVIACIÓN ESTÁNDAR se fija en el 15% del puntaje máximo. Esto define la forma de la campana.
  const populationStdDev = maxPossibleRawScore * 0.15;

  // --- Paso 3: Convertir el puntaje bruto a un puntaje de CI estándar ---

  // El Z-score mide cuántas desviaciones estándar está el usuario por encima o por debajo de la media.
  const zScore =
    populationStdDev > 0
      ? (userRawScore - populationMean) / populationStdDev
      : 0;

  // Se convierte el Z-score a la escala de CI estándar (Media=100, Desviación Estándar=15).
  const estimatedIQ = 100 + zScore * 15;

  // Se devuelve el puntaje de CI final, redondeado y dentro de un rango realista.
  return Math.round(Math.max(55, Math.min(160, estimatedIQ)));
};

const CategoryStat = ({
  name,
  correct,
  total,
}: {
  name: string;
  correct: number;
  total: number;
}) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-700">{name}</h4>
      <p className="text-gray-600 text-sm">
        {correct} de {total} correctas
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
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

  let iqColor = "text-blue-500";
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

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center animate-fade-in">
      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        ¡Test Completado!
      </h2>

      <div className="my-8">
        <div className="text-xl text-gray-700 mb-2 font-semibold">
          CI Estimado
        </div>
        <div className={`text-7xl font-bold ${iqColor}`}>{estimatedIQ}</div>
        <div className={`text-xl font-medium mt-2 ${iqColor}`}>
          {iqDescription}
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
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
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Desglose por Habilidad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryStats).map(([name, stats]) => (
            <CategoryStat
              key={name}
              name={name}
              correct={stats.correct}
              total={stats.total}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700"
      >
        <Repeat className="mr-2 h-5 w-5 inline" />
        Volver a Intentar
      </button>
    </div>
  );
};

export default Results;
