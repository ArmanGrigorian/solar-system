import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type PanelModel, DEFAULT_PANEL_MODELS } from '@/types';

interface PanelModelsContextType {
  panelModels: PanelModel[];
  addPanelModel: (model: PanelModel) => void;
  updatePanelModel: (id: string, updates: Partial<PanelModel>) => void;
  deletePanelModel: (id: string) => void;
}

const PanelModelsContext = createContext<PanelModelsContextType | undefined>(undefined);

const STORAGE_KEY = 'solar_panel_models';

export function PanelModelsProvider({ children }: { children: ReactNode }) {
  const [panelModels, setPanelModels] = useState<PanelModel[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse panel models from localStorage', e);
        return DEFAULT_PANEL_MODELS;
      }
    }
    return DEFAULT_PANEL_MODELS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panelModels));
  }, [panelModels]);

  const addPanelModel = (model: PanelModel) => {
    setPanelModels((prev) => [...prev, model]);
  };

  const updatePanelModel = (id: string, updates: Partial<PanelModel>) => {
    setPanelModels((prev) =>
      prev.map((model) => (model.id === id ? { ...model, ...updates } : model))
    );
  };

  const deletePanelModel = (id: string) => {
    setPanelModels((prev) => prev.filter((model) => model.id !== id));
  };

  return (
    <PanelModelsContext.Provider
      value={{ panelModels, addPanelModel, updatePanelModel, deletePanelModel }}
    >
      {children}
    </PanelModelsContext.Provider>
  );
}

export function usePanelModels() {
  const context = useContext(PanelModelsContext);
  if (context === undefined) {
    throw new Error('usePanelModels must be used within a PanelModelsProvider');
  }
  return context;
}
