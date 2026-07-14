import { ArrowLeft, Sun, Download } from 'lucide-react';
import type { ObstacleType } from '@/types';
import { usePDFExport } from '@/hooks/usePDFExport';
import type { SolarPanel, Obstacle } from '@/types';
import { PanelModelSelector } from './sidebar/PanelModelSelector';
import { DesignTools } from './sidebar/DesignTools';
import { ManualObstaclesForm } from './sidebar/ManualObstaclesForm';
import { SelectedItemProperties } from './sidebar/SelectedItemProperties';
import { Button } from './ui/Button';

interface SidebarProps {
  base64Image: string | null;
  onAddObstacle: (type: ObstacleType, name?: string) => void;
  onAddPanel: () => void;
  onReset: () => void;
  selectedModelId: string;
  onModelChange: (id: string) => void;
  activePanel?: SolarPanel;
  activeObstacle?: Obstacle;
  onUpdatePanel?: (id: string, updates: Partial<SolarPanel>) => void;
  onUpdateObstacle?: (id: string, updates: Partial<Obstacle>) => void;
  onRemovePanel?: (id: string) => void;
  onRemoveObstacle?: (id: string) => void;
  onClearPanels?: () => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

export function Sidebar({  
  onAddObstacle, 
  onAddPanel, 
  onReset, 
  selectedModelId, 
  onModelChange,
  activePanel,
  activeObstacle,
  onUpdatePanel,
  onUpdateObstacle,
  onRemovePanel,
  onRemoveObstacle,
  onClearPanels,
  showGrid,
  setShowGrid
}: SidebarProps) {
  const { handleExportPDF } = usePDFExport();

  return (
    <div className="w-80 shrink-0 bg-bg-secondary border-r border-border-color flex flex-col p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3 mb-8">
        <Sun className="text-accent-primary" size={28} />
        <h2 className="text-xl font-semibold tracking-tight">AI Designer</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <PanelModelSelector 
          selectedModelId={selectedModelId} 
          onModelChange={onModelChange} 
        />
        
        <DesignTools 
          onAddPanel={onAddPanel}
          onClearPanels={onClearPanels}
        />
        
        <ManualObstaclesForm 
          onAddObstacle={onAddObstacle} 
        />
        
        <SelectedItemProperties 
          activePanel={activePanel}
          activeObstacle={activeObstacle}
          onUpdateObstacle={onUpdateObstacle}
          onUpdatePanel={onUpdatePanel}
          onRemoveObstacle={onRemoveObstacle}
          onRemovePanel={onRemovePanel}
        />

        <h3 className="text-sm font-medium uppercase tracking-wide text-text-secondary">Views & Export</h3>
        
        <Button
          variant={showGrid ? "primary" : "secondary"}
          onClick={() => setShowGrid(!showGrid)}
          fullWidth
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </Button>

        <Button 
          variant="secondary"
          onClick={handleExportPDF}
          className="mt-auto mb-4"
        >
          <Download size={18} />
          Export Proposal
        </Button>
      </div>

      <Button 
        variant="ghost"
        onClick={onReset}
        className="mt-2 hover:text-accent-danger"
      >
        <ArrowLeft size={16} />
        Start Over
      </Button>
    </div>
  );
}
