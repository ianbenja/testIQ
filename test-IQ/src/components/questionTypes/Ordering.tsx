import React, { useState } from "react";
import type { Question } from "../../types"; // Importación de tipo corregida

interface OrderingProps {
  question: Question;
  onAnswer: (answer: string[], isCorrect: boolean) => void;
}

const Ordering: React.FC<OrderingProps> = ({ question, onAnswer }) => {
  const [items, setItems] = useState(question.options || []);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (item: string) => {
    setItems(items.filter((i) => i !== item));
    setSelected([...selected, item]);
  };

  const handleUndo = () => {
    if (selected.length === 0) return;
    const lastItem = selected[selected.length - 1];
    setSelected(selected.slice(0, -1));
    setItems([...items, lastItem]);
  };

  const handleSubmit = () => {
    if (selected.length !== question.options?.length) return;
    const isCorrect =
      JSON.stringify(selected) === JSON.stringify(question.correctAnswer);
    onAnswer(selected, isCorrect);
  };

  return (
    <div>
      <div className="bg-gray-900 p-4 rounded-lg min-h-[60px] mb-4 border-2 border-gray-700 flex items-center gap-2 flex-wrap">
        {selected.map((item) => (
          <span
            key={item}
            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className="bg-gray-700 p-3 rounded-lg text-lg hover:bg-cyan-700"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUndo}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Deshacer
        </button>
        <button
          onClick={handleSubmit}
          disabled={selected.length !== question.options?.length}
          className="flex-grow bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Confirmar Orden
        </button>
      </div>
    </div>
  );
};

export default Ordering;
