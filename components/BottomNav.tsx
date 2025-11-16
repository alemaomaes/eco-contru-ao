import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

// FIX: Changed JSX.Element to React.JSX.Element to resolve "Cannot find namespace 'JSX'" error.
const NavItem: React.FC<{ icon: React.JSX.Element; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'text-eco-green';
  const inactiveClasses = 'text-gray-500 hover:text-eco-green';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 h-20">
      <div className="flex justify-around items-center h-full max-w-4xl mx-auto">
        <NavItem
          icon={<HomeIcon />}
          label="Início"
          isActive={currentView === View.HOME}
          onClick={() => setView(View.HOME)}
        />
        <NavItem
          icon={<CalculatorIcon />}
          label="Calculadora"
          isActive={currentView === View.CALCULATOR}
          onClick={() => setView(View.CALCULATOR)}
        />
        <NavItem
          icon={<BulbIcon />}
          label="Dicas"
          isActive={currentView === View.TIPS}
          onClick={() => setView(View.TIPS)}
        />
        <NavItem
          icon={<ReportIcon />}
          label="Relatório"
          isActive={currentView === View.REPORT}
          onClick={() => setView(View.REPORT)}
        />
      </div>
    </nav>
  );
};

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const CalculatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
const BulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);
const ReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);