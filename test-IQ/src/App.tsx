// src/App.tsx
import { useState } from "react";
import { questions as allQuestions } from "./questions";
import type { AnswerResult, AnyQuestion } from "./types";
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const TOTAL_QUESTIONS = 20;

const selectQuestions = (allQuestions: AnyQuestion[]): AnyQuestion[] => {
  const easy = allQuestions.filter((q) => q.difficulty <= 4);
  const medium = allQuestions.filter(
    (q) => q.difficulty >= 5 && q.difficulty <= 7
  );
  const hard = allQuestions.filter((q) => q.difficulty >= 8);

  const shuffle = (arr: AnyQuestion[]) => arr.sort(() => 0.5 - Math.random());

  const selectedEasy = shuffle(easy).slice(0, 6);
  const selectedMedium = shuffle(medium).slice(0, 8);
  const selectedHard = shuffle(hard).slice(0, 6);

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
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleStart = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      const selected = selectQuestions(allQuestions);
      setTestQuestions(selected);
      setAnswers([]);
      setCurrentQuestionIndex(0);
      setStartTime(Date.now());
      setTotalTime(0);
      setGameState("playing");
      setIsFadingOut(false);
    }, 300);
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

    setIsFadingOut(true);
    setTimeout(() => {
      if (currentQuestionIndex < testQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setTotalTime(Date.now() - startTime);
        setGameState("results");
      }
      setIsFadingOut(false);
    }, 300);
  };

  const handleRestart = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setGameState("welcome");
      setIsFadingOut(false);
    }, 300);
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
              key={currentQuestionIndex}
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
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div
          className={`w-full max-w-4xl mx-auto bg-surface rounded-2xl shadow-lg p-6 md:p-10 transition-opacity duration-300 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
