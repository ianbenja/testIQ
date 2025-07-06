// src/components/Welcome.tsx
import React from "react";
import { BrainCircuit } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
  totalQuestions: number;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="bg-surface rounded-2xl p-8 text-center animate-fade-in">
      <div className="flex justify-center items-center mb-6">
        <BrainCircuit className="h-20 w-20 text-primary" />
      </div>
      <h1 className="text-5xl font-display font-bold text-textPrimary mb-4">
        Bienvenido al Test de CI
      </h1>
      <p className="text-textSecondary text-lg max-w-xl mx-auto mb-8">
        Pon a prueba tu agilidad mental, razonamiento lógico y habilidades para
        resolver problemas. Este test consta de{" "}
        <strong>{totalQuestions} preguntas</strong> seleccionadas para
        desafiarte. ¡Mucha suerte!
      </p>
      <button
        onClick={onStart}
        className="bg-primary text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        Comenzar Test
      </button>
    </div>
  );
};

export default Welcome;
