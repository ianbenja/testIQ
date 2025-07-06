import { useState } from "react";
import { questions } from "./questions";
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";
import type { Answer } from "./types";

// Creamos un nuevo tipo para almacenar el resultado de cada respuesta
interface AnswerResult {
  userAnswer: Answer;
  isCorrect: boolean;
}

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  // El estado de las respuestas ahora guarda objetos con más detalle
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  // La función handleAnswer ahora construye el objeto de respuesta completo
  const handleAnswer = (userAnswer: Answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      JSON.stringify(userAnswer) ===
      JSON.stringify(currentQuestion.correctAnswer);

    const newAnswers = [...answers, { userAnswer, isCorrect }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(-1);
    setAnswers([]);
    setShowResults(false);
  };

  const isTestStarted = currentQuestionIndex > -1;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {isTestStarted && !showResults && (
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
        )}

        <div className="mt-5 transition-all duration-300">
          {!isTestStarted && <Welcome onStart={handleStart} />}

          {isTestStarted && !showResults && currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}

          {showResults && (
            <Results
              answers={answers}
              questions={questions}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </main>
  );
}
