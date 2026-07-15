import { Trash2 } from 'lucide-react';
import type { SolarPanel } from '@/types';
import { PropertyRow } from '../ui/PropertyRow';
import { PropertySlider } from '../ui/PropertySlider';
import { PropertyButton } from '../ui/PropertyButton';

interface PanelPropertiesProps {
  panel: SolarPanel;
  onUpdate: (id: string, updates: Partial<SolarPanel>) => void;
  onRemove: (id: string) => void;
}

export function PanelProperties({ panel, onUpdate, onRemove }: PanelPropertiesProps) {
  return (
    <>
      <PropertyRow label="Model ID">
        <span className="font-mono">{panel.id.substring(0, 8)}...</span>
      </PropertyRow>
      
      <PropertyRow label="Position">
        <span className="font-mono text-text-primary text-[0.85rem]">
          {Math.round(panel.position.x)}, {Math.round(panel.position.y)}
        </span>
      </PropertyRow>
      
      <PropertyRow label="Wattage" value={`${panel.wattage}W`} />
      
      <PropertySlider
        label="Rotation"
        value={panel.rotation}
        min={0}
        max={359}
        unit="°"
        onChange={(val) => onUpdate(panel.id, { rotation: val })}
      />
      
      <div className="flex gap-2 mt-2">
        <PropertyButton onClick={() => onUpdate(panel.id, { rotation: (panel.rotation + 90) % 360 })}>
          Rotate 90°
        </PropertyButton>
        <PropertyButton variant="danger" onClick={() => onRemove(panel.id)}>
          <Trash2 size={16} /> Delete
        </PropertyButton>
      </div>
    </>
  );
}
