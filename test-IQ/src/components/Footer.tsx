// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-8 mt-auto">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-textSecondary">
          © 2024 Test de CI. Creado con fines demostrativos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
