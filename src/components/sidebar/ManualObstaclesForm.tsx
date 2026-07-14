import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ObstacleType } from '@/types';
import { Button } from '../ui/Button';

interface ManualObstaclesFormProps {
  onAddObstacle: (type: ObstacleType, name?: string) => void;
}

export function ManualObstaclesForm({ onAddObstacle }: ManualObstaclesFormProps) {
  const [manualObstacleType, setManualObstacleType] = useState<ObstacleType>('tree');
  const [manualObstacleName, setManualObstacleName] = useState('');

  return (
    <>
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">Manual Obstacles</h3>
      
      <div className="flex gap-2">
        <select 
          value={manualObstacleType}
          onChange={(e) => setManualObstacleType(e.target.value as ObstacleType)}
          className="min-w-0 bg-glass-bg text-text-primary border border-border-color p-2 rounded-sm outline-none"
        >
          <option value="tree">Tree</option>
          <option value="chimney">Chimney</option>
          <option value="vent">Vent</option>
          <option value="hvac">HVAC</option>
          <option value="skylight">Skylight</option>
        </select>
        <input 
          type="text" 
          placeholder="Name (opt)" 
          value={manualObstacleName}
          onChange={(e) => setManualObstacleName(e.target.value)}
          className="flex-1 min-w-0 bg-glass-bg text-text-primary border border-border-color p-2 rounded-sm outline-none"
        />
      </div>
      
      <Button 
        variant="secondary"
        onClick={() => {
          onAddObstacle(manualObstacleType, manualObstacleName || undefined);
          setManualObstacleName('');
        }}
        fullWidth
      >
        <AlertTriangle size={18} />
        Add Obstacle
      </Button>
      
      <div className="h-px bg-border-color my-4" />
    </>
  );
}
