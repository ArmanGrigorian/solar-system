import { Plus, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/Button';

interface DesignToolsProps {
  onAddPanel: () => void;
  onAutoLayout: () => void;
  onClearPanels?: () => void;
  hasPanels: boolean;
}

export function DesignTools({
  onAddPanel,
  onAutoLayout,
  onClearPanels,
  hasPanels
}: DesignToolsProps) {
  return (
    <>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onAddPanel} fullWidth>
          <Plus size={18} />
          Single
        </Button>
        <Button variant="secondary" onClick={onAutoLayout} fullWidth>
          <LayoutGrid size={18} />
          Auto Fill
        </Button>
      </div>

      {hasPanels && (
        <Button variant="danger" onClick={onClearPanels} fullWidth className="mt-2">
          Clear All Panels
        </Button>
      )}
    </>
  );
}
