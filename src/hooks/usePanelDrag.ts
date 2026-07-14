import type { Obstacle, SolarPanel } from "@/types";
import { checkIntersection, checkPolygonIntersection, getRotatedRectVertices } from "@/utils/math";
import type { PanInfo } from "framer-motion";

const SNAP_GRID = 5;
const MAGNETIC_THRESHOLD = 15;

export function usePanelDrag(
  panels: SolarPanel[],
  obstacles: Obstacle[],
  onUpdatePanel: (id: string, updates: Partial<SolarPanel>) => void,
  setDragError: (id: string | null) => void,
  cameraScale: number,
) {
  return (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
    const panel = panels.find((p) => p.id === id);
    if (!panel) return;

    let newX = panel.position.x + info.offset.x / cameraScale;
    let newY = panel.position.y + info.offset.y / cameraScale;

    newX = Math.round(newX / SNAP_GRID) * SNAP_GRID;
    newY = Math.round(newY / SNAP_GRID) * SNAP_GRID;
    let snappedX = false;
    let snappedY = false;

    if (panel.rotation % 90 === 0) {
      for (const other of panels) {
        if (other.id === id) continue;

        if (other.rotation % 90 !== 0) continue;

        const distLeftToRight = Math.abs(newX - (other.position.x + other.width));
        const distRightToLeft = Math.abs(newX + panel.width - other.position.x);
        const distLeftToLeft = Math.abs(newX - other.position.x);

        if (!snappedX) {
          if (distLeftToRight < MAGNETIC_THRESHOLD) {
            newX = other.position.x + other.width;
            snappedX = true;
          } else if (distRightToLeft < MAGNETIC_THRESHOLD) {
            newX = other.position.x - panel.width;
            snappedX = true;
          } else if (distLeftToLeft < MAGNETIC_THRESHOLD) {
            newX = other.position.x;
            snappedX = true;
          }
        }

        const distTopToBottom = Math.abs(newY - (other.position.y + other.height));
        const distBottomToTop = Math.abs(newY + panel.height - other.position.y);
        const distTopToTop = Math.abs(newY - other.position.y);

        if (!snappedY) {
          if (distTopToBottom < MAGNETIC_THRESHOLD) {
            newY = other.position.y + other.height;
            snappedY = true;
          } else if (distBottomToTop < MAGNETIC_THRESHOLD) {
            newY = other.position.y - panel.height;
            snappedY = true;
          } else if (distTopToTop < MAGNETIC_THRESHOLD) {
            newY = other.position.y;
            snappedY = true;
          }
        }
      }
    }

    const newRect = { x: newX, y: newY, w: panel.width, h: panel.height };
    const newPoly = getRotatedRectVertices(newRect, panel.rotation);
    let hasCollision = false;

    for (const obs of obstacles) {
      const obsRect = { x: obs.position.x, y: obs.position.y, w: obs.width, h: obs.height };
      const obsPoly = getRotatedRectVertices(obsRect, 0);
      if (checkPolygonIntersection(newPoly, obsPoly)) {
        hasCollision = true;
        break;
      }
    }

    if (!hasCollision) {
      const shrink = 1;
      const collisionRect = {
        x: newX + shrink,
        y: newY + shrink,
        w: panel.width - shrink * 2,
        h: panel.height - shrink * 2,
      };

      for (const otherPanel of panels) {
        if (otherPanel.id !== id) {
          const otherRect = {
            x: otherPanel.position.x,
            y: otherPanel.position.y,
            w: otherPanel.width,
            h: otherPanel.height,
          };
          if (checkIntersection(collisionRect, otherRect)) {
            hasCollision = true;
            break;
          }
        }
      }
    }

    if (hasCollision) {
      setDragError(id);
      setTimeout(() => setDragError(null), 1000);
      onUpdatePanel(id, { position: { ...panel.position } });
    } else {
      onUpdatePanel(id, { position: { x: newX, y: newY } });
    }
  };
}
