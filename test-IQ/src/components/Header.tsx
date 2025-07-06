// src/components/Header.tsx
import React from "react";
import { BrainCircuit } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-8">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-display font-bold text-textPrimary">
          Test de CI
        </h1>
      </div>
    </header>
  );
};

export default Header;
