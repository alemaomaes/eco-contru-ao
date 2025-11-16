import { WasteItem, DisposalPoint, WasteClass } from './types';

export const WASTE_ITEMS: WasteItem[] = [
  { id: 1, name: 'Tijolo', class: WasteClass.A, description: 'Resíduos da construção, demolição, reformas e reparos de pavimentação e de outras obras de infraestrutura.', keywords: ['tijolo', 'bloco', 'ceramica'] },
  { id: 2, name: 'Concreto', class: WasteClass.A, description: 'Resíduos da construção, demolição, reformas e reparos.', keywords: ['concreto', 'cimento', 'argamassa'] },
  { id: 3, name: 'Gesso', class: WasteClass.B, description: 'Resíduos recicláveis para outras destinações.', keywords: ['gesso', 'drywall'] },
  { id: 4, name: 'Plástico', class: WasteClass.B, description: 'Embalagens, tubos, conexões.', keywords: ['plastico', 'pvc', 'cano'] },
  { id: 5, name: 'Madeira', class: WasteClass.B, description: 'Resíduos recicláveis como madeiras de construção.', keywords: ['madeira', 'tabua', 'viga'] },
  { id: 6, name: 'Tinta', class: WasteClass.D, description: 'Resíduos perigosos oriundos do processo de construção.', keywords: ['tinta', 'solvente', 'verniz'] },
  { id: 7, name: 'Telha Cerâmica', class: WasteClass.A, description: 'Telhas de barro e cerâmica.', keywords: ['telha', 'ceramica'] },
  { id: 8, name: 'Amianto', class: WasteClass.D, description: 'Resíduos perigosos como telhas de amianto. Requer descarte especializado.', keywords: ['amianto', 'fibrocimento'] },
  { id: 9, name: 'Vidro', class: WasteClass.B, description: 'Pedaços de vidro plano de janelas e portas.', keywords: ['vidro', 'janela'] },
  { id: 10, name: 'Metal', class: WasteClass.B, description: 'Aço, ferro, vergalhões, arames.', keywords: ['metal', 'ferro', 'aco', 'vergalhao'] },
  { id: 11, name: 'Terra de Escavação', class: WasteClass.A, description: 'Solo proveniente de terraplanagem, escavações e fundações.', keywords: ['terra', 'solo', 'barro', 'escavacao'] },
  { id: 12, name: 'Isopor (EPS)', class: WasteClass.B, description: 'Isopor de lajes ou embalagens.', keywords: ['isopor', 'eps'] },
  { id: 13, name: 'Lâmpadas Fluorescentes', class: WasteClass.D, description: 'Lâmpadas contendo mercúrio. Resíduo perigoso.', keywords: ['lampada', 'fluorescente'] },
];

export const DISPOSAL_POINTS: DisposalPoint[] = [
  {
    id: 'ECOPONTO_JD_SAO_PAULO',
    name: 'Ecoponto Jardim São Paulo',
    address: 'R. Sérgio Gasparetto, 732 - Jd. São Paulo, Foz do Iguaçu - PR',
    lat: -25.5539,
    lon: -54.5681,
    acceptedClasses: [WasteClass.A],
    collects: false,
    receives: true,
    volumeRule: 'Gratuito para pequenos volumes (até 1m³).',
    operatingHours: 'Seg-Sáb: 08:00 - 18:00',
    contact: '(45) 2105-9700 (Prefeitura)',
    lastUpdated: '2024-07-22T10:00:00Z'
  },
  {
    id: 'ECOPONTO_MORUMBI',
    name: 'Ecoponto Morumbi',
    address: 'R. Cláudio Coutinho, 569 - Morumbi, Foz do Iguaçu - PR',
    lat: -25.5035,
    lon: -54.5452,
    acceptedClasses: [WasteClass.A],
    collects: false,
    receives: true,
    volumeRule: 'Gratuito para pequenos volumes (até 1m³).',
    operatingHours: 'Seg-Sáb: 08:00 - 18:00',
    contact: '(45) 2105-9700 (Prefeitura)',
    lastUpdated: '2024-07-22T10:00:00Z'
  },
   {
    id: 'ECOPONTO_PORTO_MEIRA',
    name: 'Ecoponto Porto Meira',
    address: 'R. das Tulipas, 1255 - Porto Meira, Foz do Iguaçu - PR',
    lat: -25.5925,
    lon: -54.5668,
    acceptedClasses: [WasteClass.A],
    collects: false,
    receives: true,
    volumeRule: 'Gratuito para pequenos volumes (até 1m³).',
    operatingHours: 'Seg-Sáb: 08:00 - 18:00',
    contact: '(45) 2105-9700 (Prefeitura)',
    lastUpdated: '2024-07-22T10:00:00Z'
  },
  {
    id: 'TRANSRESIDUOS',
    name: 'Transresiduos - Gestão Ambiental',
    address: 'R. Elfrido Engel, 247 - Parque Pres. 1, Foz do Iguaçu - PR',
    lat: -25.5055,
    lon: -54.5771,
    acceptedClasses: [WasteClass.A, WasteClass.B, WasteClass.C, WasteClass.D],
    collects: true,
    receives: true,
    volumeRule: 'Recebe e coleta grandes volumes. Consulte valores.',
    operatingHours: 'Seg-Sex: 08:00 - 18:00',
    contact: '(45) 3028-3001',
    lastUpdated: '2024-07-21T14:00:00Z'
  },
  {
    id: 'COLETARE',
    name: 'Coletare Resíduos',
    address: 'Av. República Argentina, 6300 - Jd Panorama II, Foz do Iguaçu - PR',
    lat: -25.5786,
    lon: -54.5772,
    acceptedClasses: [WasteClass.A, WasteClass.B],
    collects: true,
    receives: true,
    volumeRule: 'Coleta via caçambas e recebe grandes volumes. Consulte.',
    operatingHours: 'Seg-Sex: 07:30 - 18:00',
    contact: '(45) 3573-4589',
    lastUpdated: '2024-07-21T11:30:00Z'
  },
  {
    id: 'ECOPONTO_VILA_C',
    name: 'Ecoponto Vila C',
    address: 'Av. Garibaldi, 1373 - Vila C, Foz do Iguaçu - PR',
    lat: -25.4952,
    lon: -54.5958,
    acceptedClasses: [WasteClass.A],
    collects: false,
    receives: true,
    volumeRule: 'Gratuito para pequenos volumes (até 1m³).',
    operatingHours: 'Seg-Sáb: 08:00 - 18:00',
    contact: '(45) 2105-9700 (Prefeitura)',
    lastUpdated: '2024-07-22T10:00:00Z'
  }
];
