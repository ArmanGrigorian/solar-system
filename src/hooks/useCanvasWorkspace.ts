import { useState } from 'react';
import type { SolarPanel, Obstacle } from '@/types';
import { usePanelDrag } from './usePanelDrag';
import { useObstacleInteractions } from './useObstacleInteractions';

export function useCanvasWorkspace(
  panels: SolarPanel[],
  obstacles: Obstacle[],
  onUpdatePanel: (id: string, updates: Partial<SolarPanel>) => void,
  onUpdateObstacle: (id: string, updates: Partial<Obstacle>) => void,
  cameraScale: number = 1
) {
  const [dragError, setDragError] = useState<string | null>(null);

  const handleDragEnd = usePanelDrag(panels, obstacles, onUpdatePanel, setDragError, cameraScale);
  const { handleObstacleDragEnd, handleObstacleResizeEnd } = useObstacleInteractions(obstacles, onUpdateObstacle, cameraScale);

  return {
    dragError,
    handleDragEnd,
    handleObstacleDragEnd,
    handleObstacleResizeEnd
  };
}
