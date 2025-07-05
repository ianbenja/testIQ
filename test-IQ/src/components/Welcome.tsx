import React from "react";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center animate-fade-in">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">
        Test de Cociente Intelectual
      </h1>
      <p className="text-gray-300 mb-6 text-lg">
        Este test está diseñado para evaluar diferentes facetas de tus
        habilidades cognitivas, basándose en principios psicométricos. Las
        preguntas abarcan razonamiento fluido, comprensión verbal, memoria de
        trabajo y más.
      </p>
      <p className="text-gray-400 mb-8">
        Por favor, encuentra un lugar tranquilo y concéntrate. No hay un límite
        de tiempo estricto por pregunta, pero intenta responder de manera
        fluida.
      </p>
      <button
        onClick={onStart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"
      >
        Comenzar Test
      </button>
    </div>
  );
};

export default Welcome;
