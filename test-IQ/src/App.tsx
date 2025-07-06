import { useState } from "react";
import { questions } from "./questions";
import Welcome from "./components/Welcome";
import QuestionDisplay from "./components/QuestionDisplay";
import Results from "./components/Results";
import ProgressBar from "./components/ProgressBar";
import { Answer } from "./types";

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
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
