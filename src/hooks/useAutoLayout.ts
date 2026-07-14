import { useCallback } from 'react';
import type { SolarPanel, Obstacle, PanelModel } from '@/types';
import { checkPolygonIntersection, getRotatedRectVertices } from '@/utils/math';

export function useAutoLayout(
  obstacles: Obstacle[],
  selectedModel: PanelModel,
  imageBounds: { x: number, y: number, w: number, h: number } | null,
  setPanels: React.Dispatch<React.SetStateAction<SolarPanel[]>>
) {
  const handleAutoLayout = useCallback(() => {
    if (!imageBounds) return;

    setPanels(prevPanels => {
      const newPanels: SolarPanel[] = [];
      const visited = new Set<string>();
      
      const startX = imageBounds.x + (imageBounds.w / 2) - (selectedModel.width / 2);
      const startY = imageBounds.y + (imageBounds.h / 2) - (selectedModel.height / 2);
      
      const queue = [{ x: startX, y: startY }];
      let panelIdCounter = 0;
      
      const gap = 5;
      const stepX = selectedModel.width + gap;
      const stepY = selectedModel.height + gap;

      while (queue.length > 0 && newPanels.length < 200) {
        const { x, y } = queue.shift()!;
        const key = `${Math.round(x)},${Math.round(y)}`;
        
        if (visited.has(key)) continue;
        visited.add(key);

        const newRect = { x, y, w: selectedModel.width, h: selectedModel.height };
        const newPoly = getRotatedRectVertices(newRect, 0);
        
        if (x < imageBounds.x || y < imageBounds.y || (x + newRect.w) > (imageBounds.x + imageBounds.w) || (y + newRect.h) > (imageBounds.y + imageBounds.h)) {
          continue;
        }
        
        const hitsObstacle = obstacles.some(obs => {
          const obsPoly = getRotatedRectVertices({ x: obs.position.x, y: obs.position.y, w: obs.width, h: obs.height }, 0);
          return checkPolygonIntersection(newPoly, obsPoly);
        });
        
        const hitsPrevPanel = prevPanels.some(p => {
          const pPoly = getRotatedRectVertices({ x: p.position.x, y: p.position.y, w: p.width, h: p.height }, p.rotation);
          return checkPolygonIntersection(newPoly, pPoly);
        });
        
        const hitsNewPanel = newPanels.some(p => {
          const pPoly = getRotatedRectVertices({ x: p.position.x, y: p.position.y, w: p.width, h: p.height }, p.rotation);
          return checkPolygonIntersection(newPoly, pPoly);
        });
        
        if (!hitsObstacle && !hitsPrevPanel && !hitsNewPanel) {
          newPanels.push({
            id: `auto_${panelIdCounter++}_${Math.random().toString(36).substr(2, 5)}`,
            position: { x, y },
            rotation: 0,
            modelId: selectedModel.id,
            wattage: selectedModel.wattage,
            width: selectedModel.width,
            height: selectedModel.height
          });
          
          queue.push({ x: x + stepX, y });
          queue.push({ x: x - stepX, y });
          queue.push({ x, y: y + stepY });
          queue.push({ x, y: y - stepY });
        }
      }
      
      return [...prevPanels, ...newPanels];
    });
  }, [obstacles, selectedModel, imageBounds, setPanels]);

  return handleAutoLayout;
}
