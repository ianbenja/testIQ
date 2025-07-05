import React, { useState } from "react";
import type { Question } from "../../types"; // Importación de tipo corregida

interface TextInputProps {
  question: Question;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isTimed: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  question,
  onAnswer,
  isTimed,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    onAnswer(
      value,
      value.trim().toLowerCase() ===
        String(question.correctAnswer).toLowerCase()
    );
  };

  if (isTimed) {
    return (
      <div className="text-center text-gray-400">
        <p>El tiempo ha terminado. Ahora, intenta recordar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow bg-gray-900 border-2 border-gray-600 rounded-lg p-4 text-lg focus:border-cyan-500 focus:outline-none"
        placeholder="Escribe tu respuesta aquí..."
        autoFocus
      />
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
      >
        Enviar
      </button>
    </form>
  );
};

export default TextInput;
