
import React, { useState, useMemo } from 'react';

interface CalculatorModalProps {
  onClose: () => void;
}

const BIN_SIZES = [3, 4, 5, 7];

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ onClose }) => {
  const [volume, setVolume] = useState('');
  const [binSize, setBinSize] = useState(5);

  const result = useMemo(() => {
    const vol = parseFloat(volume);
    if (vol > 0 && binSize > 0) {
      return Math.ceil(vol / binSize);
    }
    return 0;
  }, [volume, binSize]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-eco-text">Calculadora de Caçambas</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Estimativa de Volume (m³)</label>
            <input
              type="number"
              id="volume"
              value={volume}
              onChange={e => setVolume(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-green focus:border-eco-green"
              placeholder="Ex: 12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tamanho da Caçamba (m³)</label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {BIN_SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setBinSize(size)}
                  className={`p-3 rounded-lg border transition ${binSize === size ? 'bg-eco-green text-white border-eco-green-dark' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {size}m³
                </button>
              ))}
            </div>
          </div>
        </div>

        {result > 0 && (
          <div className="mt-6 text-center bg-eco-gray p-4 rounded-lg">
            <p className="text-lg text-eco-text-secondary">Você precisará de aproximadamente:</p>
            <p className="text-5xl font-bold text-eco-green-dark my-2">{result}</p>
            <p className="text-lg text-eco-text-secondary">
              caçamba{result > 1 ? 's' : ''} de <span className="font-semibold">{binSize}m³</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
