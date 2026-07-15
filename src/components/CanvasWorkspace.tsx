import { useRef, useState } from 'react';
import { HUDOverlay } from '@/components/HUDOverlay';
import { ObstacleItem } from '@/components/ObstacleItem';
import { PanelItem } from '@/components/PanelItem';
import { useCanvasWorkspace } from '@/hooks/useCanvasWorkspace';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMouseCoords } from '@/hooks/useMouseCoords';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useMetrics } from '@/hooks/useMetrics';
import { FinancialSummary } from '@/components/analytics/FinancialSummary';
import type { SolarPanel, Obstacle, ProjectSettings } from '@/types';

interface CanvasWorkspaceProps {
  roofImage: string;
  panels: SolarPanel[];
  obstacles: Obstacle[];
  activePanelId: string | null;
  setActivePanelId: (id: string | null) => void;
  activeObstacleId: string | null;
  setActiveObstacleId: (id: string | null) => void;
  onUpdatePanel: (id: string, updates: Partial<SolarPanel>) => void;
  onRemovePanel: (id: string) => void;
  onUpdateObstacle: (id: string, updates: Partial<Obstacle>) => void;
  onRemoveObstacle: (id: string) => void;
  showGrid?: boolean;
  projectSettings: ProjectSettings;
}

export function CanvasWorkspace({ 
  roofImage, 
  panels, 
  obstacles, 
  activePanelId,
  setActivePanelId,
  activeObstacleId,
  setActiveObstacleId,
  onUpdatePanel, 
  onRemovePanel, 
  onUpdateObstacle,
  onRemoveObstacle,
  showGrid = false,
  projectSettings
}: CanvasWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraScale, setCameraScale] = useState(1);
  const { mouseCoords, handleMouseMove } = useMouseCoords(cameraScale);
  
  const { dragError, handleDragEnd, handleObstacleDragEnd, handleObstacleResizeEnd } = useCanvasWorkspace(
    panels,
    obstacles,
    onUpdatePanel,
    onUpdateObstacle,
    cameraScale
  );

  const metrics = useMetrics(panels, projectSettings);

  useKeyboardShortcuts({
    activePanelId,
    activeObstacleId,
    onRemovePanel,
    onRemoveObstacle,
    setActivePanelId,
    setActiveObstacleId
  });

  return (
    <div 
      id="roof-canvas-container"
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#050505] bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[20px_20px]"
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 0.1 }}
        panning={{ excluded: ['nodrag'], velocityDisabled: true }}
        onTransform={(ref: { state: { scale: number } }) => setCameraScale(ref.state.scale)}
      >
        <TransformComponent 
          wrapperStyle={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <div 
            style={{ width: "100%", height: "100%" }}
            className="relative"
            onClick={() => {
              setActivePanelId(null);
              setActiveObstacleId(null);
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Background Image */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-contain bg-center bg-no-repeat opacity-80 pointer-events-none"
              style={{ backgroundImage: `url(${roofImage})` }}
            />

            {/* Grid Overlay */}
            {showGrid && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}

            {/* Render Obstacles */}
            {obstacles.map(obs => (
              <ObstacleItem 
                key={obs.id} 
                obstacle={obs} 
                isActive={activeObstacleId === obs.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveObstacleId(obs.id);
                  setActivePanelId(null);
                }}
                onDragEnd={(e, info) => handleObstacleDragEnd(e, info, obs.id)}
                onResizeEnd={(e, info) => handleObstacleResizeEnd(e, info, obs.id)}
              />
            ))}
            
            {/* Render Panels */}
            {panels.map(panel => (
              <PanelItem
                key={panel.id}
                panel={panel}
                isActive={activePanelId === panel.id}
                isError={dragError === panel.id}
                onDragEnd={(e, info) => handleDragEnd(e, info, panel.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePanelId(panel.id);
                  setActiveObstacleId(null);
                }}
                onRemove={() => onRemovePanel(panel.id)}
              />
            ))}
          </div>
        </TransformComponent>
        <HUDOverlay />
      </TransformWrapper>
      
      {panels.length > 0 && (
        <div className="absolute bottom-6 right-6 z-30 w-72 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <FinancialSummary metrics={metrics} />
        </div>
      )}
      
      {/* Live Coordinates HUD */}
      <div className="absolute bottom-6 left-6 z-30 bg-glass-bg border border-border-color px-3 py-1.5 rounded text-[0.75rem] font-mono text-text-secondary shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-md pointer-events-none">
        X: {mouseCoords.x} &nbsp; Y: {mouseCoords.y}
      </div>
    </div>
  );
}
