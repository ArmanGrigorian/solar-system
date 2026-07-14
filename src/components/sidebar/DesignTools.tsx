import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface DesignToolsProps {
  onAddPanel: () => void;
  onClearPanels?: () => void;
}

export function DesignTools({
  onAddPanel,
  onClearPanels
}: DesignToolsProps) {
  return (
    <>
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">Design Tools</h3>
      
      <Button variant="secondary" onClick={onAddPanel} fullWidth>
        <Plus size={18} />
        Add Single Panel
      </Button>

      <Button variant="danger" onClick={onClearPanels} fullWidth>
        Clear All Panels
      </Button>
      
      <div className="h-px bg-border-color my-2" />
    </>
  );
}
