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
      
      const visualWidth = selectedModel.width;
      const visualHeight = selectedModel.height;
      const rotationDegree = 0;

      const gap = 5;
      const stepX = visualWidth + gap;
      const stepY = visualHeight + gap;

      const startVx = imageBounds.x + (imageBounds.w / 2) - (visualWidth / 2);
      const startVy = imageBounds.y + (imageBounds.h / 2) - (visualHeight / 2);
      
      const queue = [{ vx: startVx, vy: startVy }];
      let panelIdCounter = 0;

      while (queue.length > 0 && newPanels.length < 200) {
        const { vx, vy } = queue.shift()!;
        const key = `${Math.round(vx)},${Math.round(vy)}`;
        
        if (visited.has(key)) continue;
        visited.add(key);

        // Check bounds using visual coordinates
        let isValid = true;
        if (vx < imageBounds.x || vy < imageBounds.y || 
            vx + visualWidth > imageBounds.x + imageBounds.w || 
            vy + visualHeight > imageBounds.y + imageBounds.h) {
          isValid = false;
        }

        // Calculate actual unrotated x, y for the panel
        const cx = vx + visualWidth / 2;
        const cy = vy + visualHeight / 2;
        const x = cx - selectedModel.width / 2;
        const y = cy - selectedModel.height / 2;

        const newRect = { x, y, w: selectedModel.width, h: selectedModel.height };
        const newPoly = getRotatedRectVertices(newRect, rotationDegree);

        if (isValid) {
          for (const obs of obstacles) {
            const obsPoly = getRotatedRectVertices(
              { x: obs.position.x, y: obs.position.y, w: obs.width, h: obs.height }, 
              0
            );
            if (checkPolygonIntersection(newPoly, obsPoly)) {
              isValid = false;
              break;
            }
          }
        }
        
        if (isValid) {
          for (const p of prevPanels) {
            const pPoly = getRotatedRectVertices(
              { x: p.position.x, y: p.position.y, w: p.width, h: p.height }, 
              p.rotation
            );
            if (checkPolygonIntersection(newPoly, pPoly)) {
              isValid = false;
              break;
            }
          }
        }
        
        if (isValid) {
          for (const p of newPanels) {
            const pPoly = getRotatedRectVertices(
              { x: p.position.x, y: p.position.y, w: p.width, h: p.height }, 
              p.rotation
            );
            if (checkPolygonIntersection(newPoly, pPoly)) {
              isValid = false;
              break;
            }
          }
        }
        
        if (isValid) {
          newPanels.push({
            id: `auto_${panelIdCounter++}_${Math.random().toString(36).substr(2, 5)}`,
            position: { x, y },
            rotation: rotationDegree,
            modelId: selectedModel.id,
            wattage: selectedModel.wattage,
            width: selectedModel.width,
            height: selectedModel.height
          });
          
          queue.push({ vx: vx + stepX, vy });
          queue.push({ vx: vx - stepX, vy });
          queue.push({ vx, vy: vy + stepY });
          queue.push({ vx, vy: vy - stepY });
        }
      }
      
      return [...prevPanels, ...newPanels];
    });
  }, [obstacles, selectedModel, imageBounds, setPanels]);

  return handleAutoLayout;
}
