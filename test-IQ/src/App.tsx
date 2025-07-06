// src/App.tsx
import { useState } from "react";
import { questions as allQuestions } from "./questions";
import type { AnswerResult, AnyQuestion } from "./types";
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";

const TOTAL_QUESTIONS = 20;

/**
 * Selecciona un subconjunto de preguntas de forma aleatoria y balanceada.
 * @param allQuestions - El banco completo de preguntas.
 * @returns Un array de 20 preguntas seleccionadas.
 */
const selectQuestions = (allQuestions: AnyQuestion[]): AnyQuestion[] => {
  const easy = allQuestions.filter((q) => q.difficulty <= 4);
  const medium = allQuestions.filter(
    (q) => q.difficulty >= 5 && q.difficulty <= 7
  );
  const hard = allQuestions.filter((q) => q.difficulty >= 8);

  const shuffle = (arr: AnyQuestion[]) => arr.sort(() => 0.5 - Math.random());

  const selectedEasy = shuffle(easy).slice(0, 6); // 6 preguntas fáciles
  const selectedMedium = shuffle(medium).slice(0, 8); // 8 preguntas medias
  const selectedHard = shuffle(hard).slice(0, 6); // 6 preguntas difíciles

  return shuffle([...selectedEasy, ...selectedMedium, ...selectedHard]);
};

export default function App() {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "results">(
    "welcome"
  );
  const [testQuestions, setTestQuestions] = useState<AnyQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const handleStart = () => {
    const selected = selectQuestions(allQuestions);
    setTestQuestions(selected);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
    setTotalTime(0);
    setGameState("playing");
  };

  const handleAnswer = (userAnswer: string | string[]) => {
    const question = testQuestions[currentQuestionIndex];
    let isCorrect = false;

    if (Array.isArray(userAnswer) && Array.isArray(question.answer)) {
      isCorrect =
        JSON.stringify(userAnswer.sort()) ===
        JSON.stringify(question.answer.sort());
    } else if (
      typeof userAnswer === "string" &&
      typeof question.answer === "string"
    ) {
      isCorrect =
        userAnswer.trim().toLowerCase() === question.answer.toLowerCase();
    }

    setAnswers([
      ...answers,
      {
        questionId: question.id,
        isCorrect: isCorrect,
        difficulty: question.difficulty,
        category: question.category,
      },
    ]);

    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTotalTime(Date.now() - startTime);
      setGameState("results");
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
  };

  const renderContent = () => {
    switch (gameState) {
      case "playing":
        return (
          <>
            <ProgressBar
              current={currentQuestionIndex}
              total={testQuestions.length}
              startTime={startTime}
            />
            <QuestionDisplay
              question={testQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        );
      case "results":
        return (
          <Results
            answers={answers}
            allQuestions={testQuestions}
            onRestart={handleRestart}
            totalTime={totalTime}
          />
        );
      case "welcome":
      default:
        return (
          <Welcome onStart={handleStart} totalQuestions={TOTAL_QUESTIONS} />
        );
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
