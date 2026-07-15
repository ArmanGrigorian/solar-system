import { Trash2 } from 'lucide-react';
import type { Obstacle, ObstacleType } from '@/types';
import { PropertyRow } from '../ui/PropertyRow';
import { PropertySlider } from '../ui/PropertySlider';
import { PropertyButton } from '../ui/PropertyButton';

interface ObstaclePropertiesProps {
  obstacle: Obstacle;
  onUpdate: (id: string, updates: Partial<Obstacle>) => void;
  onRemove: (id: string) => void;
}

export function ObstacleProperties({ obstacle, onUpdate, onRemove }: ObstaclePropertiesProps) {
  return (
    <>
      <PropertyRow label="Type">
        <select 
          value={obstacle.type}
          onChange={(e) => onUpdate(obstacle.id, { type: e.target.value as ObstacleType })}
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
          value={obstacle.name || ''}
          onChange={(e) => onUpdate(obstacle.id, { name: e.target.value })}
          className="bg-transparent text-text-primary border border-border-color px-2 py-1 rounded-sm outline-none text-[0.85rem] w-25"
        />
      </PropertyRow>

      <PropertyRow label="Position">
        <span className="font-mono text-text-primary text-[0.85rem]">
          {Math.round(obstacle.position.x)}, {Math.round(obstacle.position.y)}
        </span>
      </PropertyRow>
      
      <PropertySlider 
        label="Roundness"
        value={obstacle.borderRadius || 0}
        min={0}
        max={50}
        unit="%"
        onChange={(val) => onUpdate(obstacle.id, { borderRadius: val })}
      />
      
      <div className="mt-2 flex">
        <PropertyButton variant="danger" onClick={() => onRemove(obstacle.id)}>
          <Trash2 size={16} /> Delete Obstacle
        </PropertyButton>
      </div>
    </>
  );
}
