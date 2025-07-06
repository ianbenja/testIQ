// src/components/questionTypes/TextInput.tsx
import React, { useState } from "react";

interface TextInputProps {
  onAnswer: (answer: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onAnswer }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    onAnswer(value.trim());
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow bg-white border-2 border-gray-300 rounded-lg p-4 text-lg text-textPrimary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        placeholder="Escribe tu respuesta aquí..."
        autoFocus
      />
      <button
        type="submit"
        className="bg-secondary text-white font-bold py-4 px-8 rounded-lg text-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-secondary/50 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
      >
        Enviar
      </button>
    </form>
  );
};

export default TextInput;
