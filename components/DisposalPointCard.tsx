
import React from 'react';
import { DisposalPoint } from '../types';

interface DisposalPointCardProps {
  point: DisposalPoint & { distance?: number };
  onReportClick: () => void;
}

export const DisposalPointCard: React.FC<DisposalPointCardProps> = ({ point, onReportClick }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform hover:scale-[1.02] animate-fade-in-up">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-eco-text">{point.name}</h3>
            <p className="text-sm text-eco-text-secondary">{point.address}</p>
          </div>
          {point.distance !== undefined && (
            <span className="text-lg font-bold text-eco-green-dark whitespace-nowrap ml-4">
              ~{point.distance.toFixed(1)} km
            </span>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 011 1v3.016a1 1 0 01-1 1H9a1 1 0 01-1-1V5z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-semibold text-yellow-800">{point.volumeRule}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-eco-text">Classes Aceitas:</p>
            <div className="flex gap-2 mt-1">
              {point.acceptedClasses.map(c => 
                <span key={c} className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">{`Classe ${c}`}</span>
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold text-eco-text">Logística:</p>
            <div className="flex flex-col gap-1 mt-1">
              {point.collects && <span className="flex items-center gap-2 text-green-700"><TruckIcon /> Faz a Coleta</span>}
              {point.receives && <span className="flex items-center gap-2 text-blue-700"><GateIcon /> Apenas Recebe</span>}
            </div>
          </div>
          <div>
            <p className="font-semibold text-eco-text">Horário:</p>
            <p className="text-eco-text-secondary">{point.operatingHours}</p>
          </div>
           <div>
            <p className="font-semibold text-eco-text">Contato:</p>
            <p className="text-eco-text-secondary">{point.contact}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex flex-col sm:flex-row gap-3 justify-between items-center">
         <p className="text-xs text-gray-500">Dados atualizados em: {new Date(point.lastUpdated).toLocaleDateString('pt-BR')}</p>
         <div className="flex gap-3">
            <button onClick={onReportClick} className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
                Registrar Descarte
            </button>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold bg-eco-green text-white rounded-lg hover:bg-eco-green-dark transition-colors flex items-center gap-2">
                <RouteIcon /> Ver Rota
            </a>
         </div>
      </div>
    </div>
  );
};


const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v5.05a2.5 2.5 0 014.9 0V8a1 1 0 00-1-1h-3z" />
    </svg>
);
const GateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
const RouteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);
