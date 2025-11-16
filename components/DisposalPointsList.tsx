
import React, { useMemo, useState } from 'react';
import { DisposalPoint, UserLocation, WasteClass, ReportEntry } from '../types';
import { DisposalPointCard } from './DisposalPointCard';

interface DisposalPointsListProps {
  points: DisposalPoint[];
  selectedWasteClass: WasteClass | undefined;
  userLocation: UserLocation | null;
  locationError: string | null;
  locationLoading: boolean;
  onRetryLocation: () => void;
  onAddReport: (entry: ReportEntry) => void;
}

const haversineDistance = (coords1: UserLocation, coords2: { lat: number, lon: number }): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.lat - coords1.latitude);
  const dLon = toRad(coords2.lon - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

export const DisposalPointsList: React.FC<DisposalPointsListProps> = ({ points, selectedWasteClass, userLocation, locationError, locationLoading, onRetryLocation, onAddReport }) => {

  const [reportingPoint, setReportingPoint] = useState<DisposalPoint | null>(null);
  const [reportVolume, setReportVolume] = useState('');

  const filteredAndSortedPoints = useMemo(() => {
    if (!selectedWasteClass) return [];
    
    const filtered = points.filter(p => p.acceptedClasses.includes(selectedWasteClass));
    
    if (!userLocation) return filtered;

    const withDistance = filtered.map(p => ({
      ...p,
      distance: haversineDistance(userLocation, { lat: p.lat, lon: p.lon })
    }));

    return withDistance.sort((a, b) => a.distance - b.distance);

  }, [points, selectedWasteClass, userLocation]);
  
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportingPoint && selectedWasteClass && reportVolume) {
       onAddReport({
        id: new Date().toISOString(),
        date: new Date(),
        wasteClass: selectedWasteClass,
        wasteName: `Resíduo Classe ${selectedWasteClass}`,
        volume: parseFloat(reportVolume),
        destination: reportingPoint.name,
       });
       setReportingPoint(null);
       setReportVolume('');
    }
  };

  if (!selectedWasteClass) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="text-eco-text-secondary">Selecione um tipo de resíduo acima para ver os locais de descarte.</p>
      </div>
    );
  }
  
  if (locationLoading) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="text-eco-text-secondary animate-pulse">Buscando sua localização para encontrar os pontos mais próximos...</p>
      </div>
    )
  }
  
  if (locationError) {
     return (
       <div className="text-center p-8 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-md">
        <p className="font-semibold">Erro de Localização</p>
        <p className="mt-2 text-sm">{locationError}</p>
        <button 
            onClick={onRetryLocation} 
            className="mt-4 px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-green-dark transition">
            Tentar Novamente
        </button>
      </div>
     )
  }

  if (filteredAndSortedPoints.length === 0) {
     return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="font-bold text-eco-text">Nenhum local encontrado</p>
        <p className="text-eco-text-secondary mt-1">Não encontramos um ponto de descarte para a Classe {selectedWasteClass} em nossa base de dados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-eco-text">2. Locais para descarte de Resíduo Classe {selectedWasteClass}</h2>
      {filteredAndSortedPoints.map(point => (
        <DisposalPointCard 
            key={point.id} 
            point={point} 
            onReportClick={() => setReportingPoint(point)} 
        />
      ))}

      {reportingPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setReportingPoint(null)}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-1">Registrar Descarte</h3>
                <p className="text-sm text-eco-text-secondary mb-4">Destino: {reportingPoint.name}</p>
                <form onSubmit={handleReportSubmit}>
                    <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volume (m³)</label>
                    <input
                        type="number"
                        id="volume"
                        value={reportVolume}
                        onChange={e => setReportVolume(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-green focus:border-eco-green"
                        placeholder="Ex: 1.5"
                        step="0.1"
                        required
                    />
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setReportingPoint(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-green-dark">Adicionar ao Relatório</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};
