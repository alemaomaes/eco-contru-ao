
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { WasteItem, DisposalPoint, UserLocation, ReportEntry, WasteClass, View } from './types';
import { WASTE_ITEMS, DISPOSAL_POINTS } from './constants';
import { Header } from './components/Header';
import { WasteSearch } from './components/WasteSearch';
import { DisposalPointsList } from './components/DisposalPointsList';
import { BottomNav } from './components/BottomNav';
import { CalculatorModal } from './components/CalculatorModal';
import { TipsModal } from './components/TipsModal';
import { ReportView } from './components/ReportView';
import { useGeolocation } from './hooks/useGeolocation';

const App: React.FC = () => {
  const [selectedWaste, setSelectedWaste] = useState<WasteItem | null>(null);
  const [reportEntries, setReportEntries] = useState<ReportEntry[]>([]);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  
  const { location, error, loading: locationLoading, requestLocation } = useGeolocation();
  
  const handleWasteSelection = useCallback((waste: WasteItem) => {
    setSelectedWaste(waste);
    setCurrentView(View.HOME);
    if (!location && !error) {
      requestLocation();
    }
  }, [location, error, requestLocation]);
  
  const addReportEntry = (entry: ReportEntry) => {
    setReportEntries(prev => [...prev, entry]);
    alert('Entrada adicionada ao relatório com sucesso!');
  };

  const MainContent: React.FC = () => {
    switch(currentView) {
      case View.CALCULATOR:
        return <CalculatorModal onClose={() => setCurrentView(View.HOME)} />;
      case View.TIPS:
        return <TipsModal onClose={() => setCurrentView(View.HOME)} />;
      case View.REPORT:
        return <ReportView entries={reportEntries} />;
      case View.HOME:
      default:
        return (
          <div className="p-4 md:p-6 space-y-6">
            <WasteSearch wasteItems={WASTE_ITEMS} onSelect={handleWasteSelection} />
            {selectedWaste && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 animate-fade-in">
                <p className="text-lg text-eco-text-secondary">
                  <span className="font-bold text-eco-text">{selectedWaste.name}</span> é classificado como:
                </p>
                <p className={`text-2xl font-bold ${selectedWaste.class === 'A' ? 'text-blue-600' : selectedWaste.class === 'B' ? 'text-green-600' : selectedWaste.class === 'C' ? 'text-yellow-600' : 'text-red-600'}`}>
                  Resíduo Classe {selectedWaste.class}
                </p>
                <p className="mt-2 text-sm text-eco-text-secondary">{selectedWaste.description}</p>
                <p className="mt-4 text-sm text-eco-text">Legal! Agora vamos encontrar o melhor local para o descarte em Foz.</p>
              </div>
            )}
            <DisposalPointsList 
              points={DISPOSAL_POINTS} 
              selectedWasteClass={selectedWaste?.class}
              userLocation={location}
              locationError={error}
              locationLoading={locationLoading}
              onRetryLocation={requestLocation}
              onAddReport={addReportEntry}
            />
          </div>
        );
    }
  }

  return (
    <div className="bg-eco-gray min-h-screen font-sans text-eco-text">
      <div className="container mx-auto max-w-4xl pb-24">
        <Header />
        <main>
          <MainContent />
        </main>
      </div>
      <BottomNav currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

export default App;
