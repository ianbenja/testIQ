import { Question } from "../types";
import MultipleChoice from "./questionTypes/MultipleChoice";
import TextInput from "./questionTypes/TextInput";
import Ordering from "./questionTypes/Ordering";

interface Props {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
}

function QuestionDisplay({ question, onAnswer }: Props) {
  const renderQuestionType = () => {
    switch (question.type) {
      case "multipleChoice":
        return <MultipleChoice question={question} onAnswer={onAnswer} />;
      case "textInput":
        return <TextInput question={question} onAnswer={onAnswer} />;
      case "ordering":
        return <Ordering question={question} onAnswer={onAnswer} />;
      default:
        return <p>Tipo de pregunta no reconocido.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        {question.text}
      </h2>

      {/* Renderiza la imagen si existe en el objeto de la pregunta */}
      {question.image && (
        <div className="my-4 flex justify-center">
          <img
            src={question.image}
            alt={`Visual para la pregunta: ${question.text}`}
            className="rounded-lg max-w-sm w-full shadow-md border-4 border-gray-200 dark:border-gray-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Previene bucles infinitos
              target.src =
                "https://placehold.co/400x200/ef4444/ffffff?text=Error+al+cargar+imagen";
            }}
          />
        </div>
      )}

      <div className="w-full mt-4">{renderQuestionType()}</div>
    </div>
  );
}

export default QuestionDisplay;
