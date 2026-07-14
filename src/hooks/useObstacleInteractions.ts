import type { PanInfo } from 'framer-motion';
import type { Obstacle } from '@/types';

const SNAP_GRID = 5;

export function useObstacleInteractions(
  obstacles: Obstacle[],
  onUpdateObstacle: (id: string, updates: Partial<Obstacle>) => void,
  cameraScale: number
) {
  const handleObstacleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
    const obstacle = obstacles.find(o => o.id === id);
    if (!obstacle) return;

    let newX = obstacle.position.x + (info.offset.x / cameraScale);
    let newY = obstacle.position.y + (info.offset.y / cameraScale);

    newX = Math.round(newX / SNAP_GRID) * SNAP_GRID;
    newY = Math.round(newY / SNAP_GRID) * SNAP_GRID;

    onUpdateObstacle(id, { position: { x: newX, y: newY } });
  };

  const handleObstacleResizeEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
    const obstacle = obstacles.find(o => o.id === id);
    if (!obstacle) return;

    let newWidth = obstacle.width + (info.offset.x / cameraScale);
    let newHeight = obstacle.height + (info.offset.y / cameraScale);

    newWidth = Math.max(20, Math.round(newWidth / SNAP_GRID) * SNAP_GRID);
    newHeight = Math.max(20, Math.round(newHeight / SNAP_GRID) * SNAP_GRID);

    onUpdateObstacle(id, { width: newWidth, height: newHeight });
  };

  return { handleObstacleDragEnd, handleObstacleResizeEnd };
}
