import React, { useState } from "react";
import type { Answer } from "./types"; // Importación de tipo corregida
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import { questions } from "./questions";

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [testFinished, setTestFinished] = useState(false);

  const startTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestFinished(false);
  };

  const handleAnswer = (answer: string | string[], isCorrect: boolean) => {
    if (currentQuestionIndex === null) return;

    const newAnswer: Answer = {
      questionIndex: currentQuestionIndex,
      answer,
      isCorrect,
    };
    setAnswers([...answers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestFinished(true);
      setCurrentQuestionIndex(null);
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(null);
    setAnswers([]);
    setTestFinished(false);
  };

  const renderContent = () => {
    if (testFinished) {
      return (
        <Results
          answers={answers}
          totalQuestions={questions.length}
          onRestart={restartTest}
        />
      );
    }
    if (currentQuestionIndex !== null) {
      return (
        <QuestionDisplay
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      );
    }
    return <Welcome onStart={startTest} />;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">{renderContent()}</div>
    </div>
  );
};

export default App;
