import type { PanelModel, SolarPanel } from "@/types";
import { useCallback, useMemo, useState } from "react";

export function usePanels(
  panelModels: PanelModel[], 
  selectedModelId: string
) {
  const [rawPanels, setRawPanels] = useState<SolarPanel[]>([]);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);

  const selectedModel = useMemo(
    () => panelModels.find((m) => m.id === selectedModelId) || panelModels[0],
    [selectedModelId, panelModels],
  );

  const panels = useMemo(() => {
    return rawPanels.map((p) => {
      const model = panelModels.find((m) => m.id === p.modelId) || panelModels[0];
      return {
        ...p,
        width: model.width,
        height: model.height,
        wattage: model.wattage,
      };
    });
  }, [rawPanels, panelModels]);

  const handleAddPanel = useCallback(() => {
    const canvasWidth = window.innerWidth - 320;
    const canvasHeight = window.innerHeight;
    const newPanel: SolarPanel = {
      id: Math.random().toString(36).substr(2, 9),
      position: { x: canvasWidth / 2, y: canvasHeight / 2 },
      rotation: 0,
      modelId: selectedModel.id,
      wattage: selectedModel.wattage,
      width: selectedModel.width,
      height: selectedModel.height,
    };
    setRawPanels((prev) => [...prev, newPanel]);
  }, [selectedModel]);

  const handleUpdatePanel = useCallback((id: string, updates: Partial<SolarPanel>) => {
    setRawPanels((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const handleRemovePanel = useCallback((id: string) => {
    setRawPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleClearPanels = useCallback(() => {
    setRawPanels([]);
    setActivePanelId(null);
  }, []);

  return {
    panels,
    activePanelId,
    setActivePanelId,
    handleAddPanel,
    handleUpdatePanel,
    handleRemovePanel,
    handleClearPanels,
    setRawPanels,
  };
}
