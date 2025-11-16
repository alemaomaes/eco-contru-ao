
import React, { useState, useMemo } from 'react';
import { WasteItem } from '../types';

interface WasteSearchProps {
  wasteItems: WasteItem[];
  onSelect: (item: WasteItem) => void;
}

export const WasteSearch: React.FC<WasteSearchProps> = ({ wasteItems, onSelect }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredItems = useMemo(() => {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    return wasteItems.filter(item =>
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
    );
  }, [query, wasteItems]);

  const handleSelect = (item: WasteItem) => {
    setQuery(item.name);
    setShowSuggestions(false);
    onSelect(item);
  };

  return (
    <div className="relative">
      <label htmlFor="waste-search" className="block text-lg font-semibold mb-2 text-eco-text">
        1. Qual resíduo você quer descartar?
      </label>
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input
          id="waste-search"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Ex: tijolo, gesso, tinta..."
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-eco-green-dark focus:border-eco-green-dark transition"
          autoComplete="off"
        />
      </div>

      {showSuggestions && filteredItems.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredItems.map(item => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-3 hover:bg-eco-gray cursor-pointer border-b last:border-b-0"
            >
              <span className="font-semibold">{item.name}</span> - <span className="text-eco-text-secondary">Classe {item.class}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
