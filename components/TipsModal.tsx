
import React from 'react';

interface TipsModalProps {
  onClose: () => void;
}

const tips = [
  { title: "Planejamento de Materiais", content: "Compre materiais na quantidade certa para evitar sobras. Use ferramentas de cálculo para estimar com precisão." },
  { title: "Reutilização no Canteiro", content: "Reaproveite sobras de madeira para formas ou escoramentos. Pedaços de tijolos e blocos podem ser usados como base para contrapisos." },
  { title: "Segregação Correta", content: "Separe os resíduos por classe (A, B, C, D) no próprio canteiro. Isso facilita a reciclagem e o descarte correto, além de poder gerar receita." },
  { title: "Doação de Sobras", content: "Materiais em bom estado que sobraram, como pisos, azulejos e esquadrias, podem ser doados para instituições ou projetos sociais." },
  { title: "Gestão de Gesso", content: "O gesso é 100% reciclável, mas contamina outros materiais. Sempre separe o gesso e o destine para usinas de reciclagem específicas." },
  { title: "Opte por Pré-moldados", content: "Estruturas pré-moldadas ou pré-fabricadas geram muito menos resíduo no canteiro de obras." },
];

export const TipsModal: React.FC<TipsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-eco-text">Dicas de Redução de Desperdício</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {tips.map((tip, index) => (
            <div key={index} className="p-4 border rounded-lg bg-eco-gray">
              <h3 className="font-bold text-eco-green-dark">{tip.title}</h3>
              <p className="text-sm text-eco-text-secondary mt-1">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
