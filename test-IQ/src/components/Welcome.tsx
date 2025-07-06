import React from "react";
import { BrainCircuit } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center transition-all duration-500 hover:shadow-2xl">
      <div className="flex justify-center items-center mb-6">
        <BrainCircuit className="h-16 w-16 text-indigo-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido al Test de CI
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Pon a prueba tu agilidad mental, razonamiento lógico y habilidades para
        resolver problemas. Este test está diseñado para ser desafiante y
        divertido. ¡Mucha suerte!
      </p>
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        Comenzar Test
      </button>
    </div>
  );
};

export default Welcome;
