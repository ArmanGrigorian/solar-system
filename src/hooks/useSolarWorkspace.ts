import { useState, useMemo, useCallback } from 'react';
import { PANEL_MODELS } from '@/types';
import type { SolarPanel, Obstacle } from '@/types';
import type { ObstacleType } from '@/types';

/**
 * Core hook for managing the solar design workspace state.
 * Handles the mapping of AI-detected obstacles from relative to absolute coordinates,
 * manages the solar panel array, and handles auto-layout logic.
 * 
 * @param detectedObstacles - Raw obstacle data returned from the OpenAI vision model.
 * @returns State and handlers for the solar panels, 3D view toggle, and obstacle mapping.
 */

export function useSolarWorkspace() {
  const [panels, setPanels] = useState<SolarPanel[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string>(PANEL_MODELS[0].id);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const [activeObstacleId, setActiveObstacleId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  const selectedModel = useMemo(() => PANEL_MODELS.find(m => m.id === selectedModelId) || PANEL_MODELS[0], [selectedModelId]);

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
      height: selectedModel.height
    };
    setPanels(prev => [...prev, newPanel]);
  }, [selectedModel]);

  const handleUpdatePanel = useCallback((id: string, updates: Partial<SolarPanel>) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const handleAddObstacle = useCallback((type: ObstacleType, name?: string) => {
    const canvasWidth = window.innerWidth - 320;
    const canvasHeight = window.innerHeight;
    
    let width = 60;
    let height = 60;
    if (type === 'tree') { width = 120; height = 120; }
    if (type === 'chimney') { width = 40; height = 40; }
    if (type === 'vent') { width = 30; height = 30; }

    const newObstacle: Obstacle = {
      id: `manual_obs_${Math.random().toString(36).substr(2, 9)}`,
      type,
      name,
      position: { x: canvasWidth / 2 - (width / 2), y: canvasHeight / 2 - (height / 2) },
      width,
      height,
      borderRadius: type === 'tree' ? 50 : 0
    };
    
    setObstacles(prev => [...prev, newObstacle]);
  }, []);

  const handleUpdateObstacle = useCallback((id: string, updates: Partial<Obstacle>) => {
    setObstacles(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  }, []);
  
  const handleRemovePanel = useCallback((id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleClearPanels = useCallback(() => {
    setPanels([]);
    setActivePanelId(null);
  }, []);

  const handleRemoveObstacle = useCallback((id: string) => {
    setObstacles(prev => prev.filter(o => o.id !== id));
  }, []);

  return {
    panels,
    obstacles,
    selectedModelId,
    setSelectedModelId,
    activePanelId,
    setActivePanelId,
    activeObstacleId,
    setActiveObstacleId,
    handleAddPanel,
    handleUpdatePanel,
    handleRemovePanel,
    handleAddObstacle,
    handleUpdateObstacle,
    handleRemoveObstacle,
    handleClearPanels,
    showGrid,
    setShowGrid
  };
}
