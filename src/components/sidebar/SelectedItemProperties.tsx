import { Trash2 } from 'lucide-react';
import type { SolarPanel, Obstacle, ObstacleType } from '@/types';
import { PropertyRow } from '../ui/PropertyRow';
import { PropertySlider } from '../ui/PropertySlider';
import { PropertyButton } from '../ui/PropertyButton';

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
          <>
            <PropertyRow label="Type">
              <select 
                value={activeObstacle.type}
                onChange={(e) => onUpdateObstacle(activeObstacle.id, { type: e.target.value as ObstacleType })}
                className="bg-transparent text-text-primary border border-border-color px-2 py-1 rounded-sm outline-none text-[0.85rem]"
              >
                <option value="tree">Tree</option>
                <option value="chimney">Chimney</option>
                <option value="vent">Vent</option>
                <option value="hvac">HVAC</option>
                <option value="skylight">Skylight</option>
              </select>
            </PropertyRow>
            
            <PropertyRow label="Name">
              <input 
                type="text" 
                placeholder="Unnamed"
                value={activeObstacle.name || ''}
                onChange={(e) => onUpdateObstacle(activeObstacle.id, { name: e.target.value })}
                className="bg-transparent text-text-primary border border-border-color px-2 py-1 rounded-sm outline-none text-[0.85rem] w-25"
              />
            </PropertyRow>

            <PropertyRow label="Position">
              <span className="font-mono text-text-primary text-[0.85rem]">
                {Math.round(activeObstacle.position.x)}, {Math.round(activeObstacle.position.y)}
              </span>
            </PropertyRow>
            
            <PropertySlider 
              label="Roundness"
              value={activeObstacle.borderRadius || 0}
              min={0}
              max={50}
              unit="%"
              onChange={(val) => onUpdateObstacle(activeObstacle.id, { borderRadius: val })}
            />
            
            <div className="mt-2 flex">
              <PropertyButton variant="danger" onClick={() => onRemoveObstacle(activeObstacle.id)}>
                <Trash2 size={16} /> Delete Obstacle
              </PropertyButton>
            </div>
          </>
        )}
        
        {activePanel && onRemovePanel && (
          <>
            <PropertyRow label="Model ID">
              <span className="font-mono">{activePanel.id.substring(0, 8)}...</span>
            </PropertyRow>
            
            <PropertyRow label="Position">
              <span className="font-mono text-text-primary text-[0.85rem]">
                {Math.round(activePanel.position.x)}, {Math.round(activePanel.position.y)}
              </span>
            </PropertyRow>
            
            <PropertyRow label="Wattage" value={`${activePanel.wattage}W`} />
            
            <PropertyRow 
              label="Orientation" 
              value={activePanel.width > activePanel.height ? 'Landscape' : 'Portrait'} 
            />
            
            <PropertySlider
              label="Rotation"
              value={activePanel.rotation}
              min={0}
              max={359}
              unit="°"
              onChange={(val) => onUpdatePanel && onUpdatePanel(activePanel.id, { rotation: val })}
            />
            
            <div className="flex gap-2 mt-2">
              <PropertyButton onClick={() => onUpdatePanel && onUpdatePanel(activePanel.id, { rotation: (activePanel.rotation + 90) % 360 })}>
                Rotate 90°
              </PropertyButton>
              <PropertyButton variant="danger" onClick={() => onRemovePanel(activePanel.id)}>
                <Trash2 size={16} /> Delete
              </PropertyButton>
            </div>
          </>
        )}
      </div>
      <div className="h-px bg-border-color my-4" />
    </>
  );
}
