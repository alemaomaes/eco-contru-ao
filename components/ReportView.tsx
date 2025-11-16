
import React, { useMemo } from 'react';
import { ReportEntry } from '../types';

interface ReportViewProps {
  entries: ReportEntry[];
}

export const ReportView: React.FC<ReportViewProps> = ({ entries }) => {

  const totalVolume = useMemo(() => {
    return entries.reduce((acc, entry) => acc + entry.volume, 0).toFixed(2);
  }, [entries]);

  const handleGenerateReport = () => {
    alert("Função 'Gerar Relatório para Fiscalização' em desenvolvimento.\n\nEste seria um documento formatado para impressão, servindo como uma Declaração de Conformidade Voluntária, protegendo a obra.");
  }
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-eco-text">Relatório de Descarte</h2>
      
      {entries.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-eco-text-secondary">Nenhum descarte registrado ainda.</p>
          <p className="text-sm text-eco-text-secondary mt-2">Use o botão "Registrar Descarte" nos locais para adicionar entradas aqui.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-bold">Resumo Geral</h3>
            <p>Total de Entradas: <span className="font-semibold text-eco-green-dark">{entries.length}</span></p>
            <p>Volume Total Descartado: <span className="font-semibold text-eco-green-dark">{totalVolume} m³</span></p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Data</th>
                  <th scope="col" className="px-6 py-3">Resíduo</th>
                  <th scope="col" className="px-6 py-3">Volume (m³)</th>
                  <th scope="col" className="px-6 py-3">Destino</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(entry.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{entry.wasteName}</td>
                    <td className="px-6 py-4">{entry.volume.toFixed(2)}</td>
                    <td className="px-6 py-4">{entry.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-end">
            <button onClick={handleGenerateReport} className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-green-dark transition-colors">
              Gerar Relatório para Fiscalização
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
