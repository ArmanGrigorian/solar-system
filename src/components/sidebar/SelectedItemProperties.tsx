import type { SolarPanel, Obstacle } from '@/types';
import { ObstacleProperties } from './ObstacleProperties';
import { PanelProperties } from './PanelProperties';

interface SelectedItemPropertiesProps {
  activePanel?: SolarPanel;
  activeObstacle?: Obstacle;
  onUpdateObstacle?: (id: string, updates: Partial<Obstacle>) => void;
  onUpdatePanel?: (id: string, updates: Partial<SolarPanel>) => void;
  onRemoveObstacle?: (id: string) => void;
  onRemovePanel?: (id: string) => void;
}

export function SelectedItemProperties({
  activePanel,
  activeObstacle,
  onUpdateObstacle,
  onUpdatePanel,
  onRemoveObstacle,
  onRemovePanel
}: SelectedItemPropertiesProps) {
  if (!activePanel && !activeObstacle) return null;

  return (
    <>
      <h3 className="text-sm font-medium text-accent-primary uppercase tracking-wide">Selected Item</h3>
      <div className="bg-glass-bg border border-accent-primary rounded-sm p-4 flex flex-col gap-3">
        {activeObstacle && onUpdateObstacle && onRemoveObstacle && (
          <ObstacleProperties 
            obstacle={activeObstacle} 
            onUpdate={onUpdateObstacle} 
            onRemove={onRemoveObstacle} 
          />
        )}
        
        {activePanel && onUpdatePanel && onRemovePanel && (
          <PanelProperties 
            panel={activePanel} 
            onUpdate={onUpdatePanel} 
            onRemove={onRemovePanel} 
          />
        )}
      </div>
      <div className="h-px bg-border-color my-4" />
    </>
  );
}
