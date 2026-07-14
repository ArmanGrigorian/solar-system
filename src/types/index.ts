interface Position {
  x: number;
  y: number;
}

export interface PanelModel {
  id: string;
  name: string;
  manufacturer: string;
  wattage: number;
  width: number;
  height: number;
  cost: number;
}

export interface SolarPanel {
  id: string;
  position: Position;
  rotation: number; 
  modelId: string;
  wattage: number; 
  width: number; 
  height: number;
}

export type ObstacleType = 'chimney' | 'skylight' | 'hvac' | 'vent' | 'tree';

export interface Obstacle {
  id: string;
  type: ObstacleType;
  position: Position;
  width: number;
  height: number;
  borderRadius?: number;
  name?: string;
}

export interface ProjectMetrics {
  totalCapacity: number; 
  panelCount: number;
  estAnnualProduction: number; 
  systemCost: number; 
  estAnnualSavings: number; 
  paybackPeriod: number; 
  co2Offset: number; 
}

export const PANEL_MODELS: PanelModel[] = [
  { id: 'std-400', name: 'Standard 400W', manufacturer: 'SolarTech', wattage: 400, width: 39, height: 65, cost: 1200 }, // $3.00/W installed
  { id: 'pro-450', name: 'Premium 450W', manufacturer: 'SunPower', wattage: 450, width: 40, height: 68, cost: 1350 }, // $3.00/W installed
  { id: 'max-500', name: 'Maxeon 500W', manufacturer: 'Maxeon', wattage: 500, width: 41, height: 72, cost: 1500 }, // $3.00/W installed
];

