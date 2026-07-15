import type { ObstacleType } from "@/types";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

interface ManualObstaclesFormProps {
  onAddObstacle: (type: ObstacleType, name?: string) => void;
  onClearObstacles?: () => void;
  hasObstacles: boolean;
}

export function ManualObstaclesForm({
  onAddObstacle,
  onClearObstacles,
  hasObstacles,
}: ManualObstaclesFormProps) {
  const [manualObstacleType, setManualObstacleType] = useState<ObstacleType>("tree");
  const [manualObstacleName, setManualObstacleName] = useState("");

  return (
    <>
      <div className="flex gap-2">
        <select
          value={manualObstacleType}
          onChange={(e) => setManualObstacleType(e.target.value as ObstacleType)}
          className="min-w-0 bg-bg-panel text-text-primary border border-border-color hover:border-accent-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary p-2 rounded-sm outline-none transition-all cursor-pointer">
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
          className="flex-1 min-w-0 bg-bg-panel text-text-primary border border-border-color hover:border-accent-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary p-2 rounded-sm outline-none transition-all placeholder-text-muted"
        />
      </div>

      <Button
        variant="secondary"
        onClick={() => {
          onAddObstacle(manualObstacleType, manualObstacleName || undefined);
          setManualObstacleName("");
        }}
        fullWidth>
        <AlertTriangle size={18} />
        Add Obstacle
      </Button>

      {hasObstacles && (
        <Button variant="danger" onClick={onClearObstacles} fullWidth className="mt-2">
          Clear All Obstacles
        </Button>
      )}
    </>
  );
}
