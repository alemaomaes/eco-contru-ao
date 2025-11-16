
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-eco-green text-white p-5 text-center rounded-b-lg shadow-lg sticky top-0 z-20">
      <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L1 21h22L12 2zm-1.41 15.41L6.17 13l-1.42 1.41L10.59 19 19.59 10l-1.41-1.41L10.59 17.17z"/>
        </svg>
        EcoConstrução Foz
      </h1>
      <p className="text-sm opacity-90 mt-1">Sua obra limpa, sua cidade agradece.</p>
    </header>
  );
};
