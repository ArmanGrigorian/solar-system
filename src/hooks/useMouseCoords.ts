import { useState, useCallback } from 'react';

export function useMouseCoords(cameraScale: number) {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / cameraScale);
    const y = Math.round((e.clientY - rect.top) / cameraScale);
    setMouseCoords({ x, y });
  }, [cameraScale]);

  return { mouseCoords, handleMouseMove };
}
