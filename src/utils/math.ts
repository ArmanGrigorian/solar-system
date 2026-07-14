export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Gets the 4 vertices of a rotated rectangle.
 * @param r The rectangle definition (x, y is top-left before rotation).
 * @param rotationDeg Rotation in degrees, rotating around the center of the rect.
 * @returns Array of 4 points.
 */
export function getRotatedRectVertices(r: Rect, rotationDeg: number = 0): Point[] {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  
  const rad = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  
  // 4 corners before rotation relative to center
  const corners = [
    { x: -r.w / 2, y: -r.h / 2 }, // Top-Left
    { x: r.w / 2, y: -r.h / 2 },  // Top-Right
    { x: r.w / 2, y: r.h / 2 },   // Bottom-Right
    { x: -r.w / 2, y: r.h / 2 }   // Bottom-Left
  ];
  
  return corners.map(c => ({
    x: cx + (c.x * cos - c.y * sin),
    y: cy + (c.x * sin + c.y * cos)
  }));
}

/**
 * Checks if two polygons overlap using the Separating Axis Theorem (SAT).
 * @param poly1 Array of points representing the first polygon.
 * @param poly2 Array of points representing the second polygon.
 * @returns true if they intersect.
 */
export function checkPolygonIntersection(poly1: Point[], poly2: Point[]): boolean {
  const polygons = [poly1, poly2];
  
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    
    for (let i1 = 0; i1 < polygon.length; i1++) {
      const i2 = (i1 + 1) % polygon.length;
      const p1 = polygon[i1];
      const p2 = polygon[i2];
      
      // Normal vector of the edge
      const normal = { x: p2.y - p1.y, y: p1.x - p2.x };
      
      let minA = Infinity, maxA = -Infinity;
      for (const p of poly1) {
        const projected = normal.x * p.x + normal.y * p.y;
        if (projected < minA) minA = projected;
        if (projected > maxA) maxA = projected;
      }
      
      let minB = Infinity, maxB = -Infinity;
      for (const p of poly2) {
        const projected = normal.x * p.x + normal.y * p.y;
        if (projected < minB) minB = projected;
        if (projected > maxB) maxB = projected;
      }
      
      if (maxA < minB || maxB < minA) {
        return false; // Found a separating axis
      }
    }
  }
  
  return true;
}

/**
 * Legacy checkIntersection - checks axis-aligned bounding boxes.
 * Keeping for backward compatibility if needed, but redirects to SAT for now
 * if we want to ensure everything uses the new system, but faster to just do AABB if rotation=0.
 */

export function checkIntersection(r1: Rect, r2: Rect): boolean {
  return !(
    r2.x >= r1.x + r1.w || 
    r2.x + r2.w <= r1.x || 
    r2.y >= r1.y + r1.h || 
    r2.y + r2.h <= r1.y
  );
}
