import { useState, useCallback } from 'react';
import type { Obstacle, ObstacleType } from '@/types';

export function useObstacles() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [activeObstacleId, setActiveObstacleId] = useState<string | null>(null);

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

  const handleRemoveObstacle = useCallback((id: string) => {
    setObstacles(prev => prev.filter(o => o.id !== id));
  }, []);

  const handleClearObstacles = useCallback(() => {
    setObstacles([]);
    setActiveObstacleId(null);
  }, []);

  return {
    obstacles,
    activeObstacleId,
    setActiveObstacleId,
    handleAddObstacle,
    handleUpdateObstacle,
    handleRemoveObstacle,
    handleClearObstacles
  };
}
