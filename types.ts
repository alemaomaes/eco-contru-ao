
export enum WasteClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum View {
  HOME = 'HOME',
  CALCULATOR = 'CALCULATOR',
  TIPS = 'TIPS',
  REPORT = 'REPORT'
}

export interface WasteItem {
  id: number;
  name: string;
  class: WasteClass;
  description: string;
  keywords: string[];
}

export interface DisposalPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  acceptedClasses: WasteClass[];
  collects: boolean;
  receives: boolean;
  volumeRule: string;
  operatingHours: string;
  contact: string;
  lastUpdated: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface ReportEntry {
  id: string;
  date: Date;
  wasteClass: WasteClass;
  wasteName: string;
  volume: number;
  destination: string;
}
