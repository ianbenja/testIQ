// src/App.tsx
import { useState, useEffect } from "react";
import { questions as allQuestions } from "./questions";
import { AnswerResult, AnyQuestion } from "./types";
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";

// Hacemos una copia para poder mezclarla sin afectar al array original
const questions = [...allQuestions];

export default function App() {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "results">(
    "welcome"
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);

  // Mezclamos las preguntas solo una vez, cuando el componente se monta
  useEffect(() => {
    questions.sort(() => Math.random() - 0.5);
  }, []);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setGameState("playing");
  };

  const handleAnswer = (userAnswer: string | string[]) => {
    const question = questions[currentQuestionIndex];
    let isCorrect = false;

    // Comparamos las respuestas de forma segura
    if (Array.isArray(userAnswer) && Array.isArray(question.answer)) {
      isCorrect =
        JSON.stringify(userAnswer) === JSON.stringify(question.answer);
    } else if (
      typeof userAnswer === "string" &&
      typeof question.answer === "string"
    ) {
      isCorrect = userAnswer.toUpperCase() === question.answer.toUpperCase();
    }

    // Guardamos un resultado más detallado
    setAnswers([
      ...answers,
      {
        questionId: question.id,
        isCorrect: isCorrect,
        difficulty: question.difficulty,
        category: question.category,
      },
    ]);

    // Avanzamos a la siguiente pregunta o a los resultados
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameState("results");
    }
  };

  const handleRestart = () => {
    // Volvemos a mezclar las preguntas para el siguiente intento
    questions.sort(() => Math.random() - 0.5);
    setGameState("welcome");
  };

  const renderContent = () => {
    switch (gameState) {
      case "playing":
        return (
          <>
            <ProgressBar
              current={currentQuestionIndex}
              total={questions.length}
            />
            <p className="text-center text-gray-500 mb-4">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </p>
            <QuestionDisplay
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        );
      case "results":
        // Pasamos el array original de preguntas para los cálculos
        return (
          <Results
            answers={answers}
            allQuestions={allQuestions}
            onRestart={handleRestart}
          />
        );
      case "welcome":
      default:
        return <Welcome onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {renderContent()}
      </main>
    </div>
  );
}
