import { usePDFExport } from "@/hooks/usePDFExport";
import type { Obstacle, ObstacleType, ProjectSettings, SolarPanel } from "@/types";
import { ArrowLeft, Download, Sun } from "lucide-react";
import { DesignTools } from "./sidebar/DesignTools";
import { ManualObstaclesForm } from "./sidebar/ManualObstaclesForm";
import { PanelModelSelector } from "./sidebar/PanelModelSelector";
import { SelectedItemProperties } from "./sidebar/SelectedItemProperties";
import { SiteSettings } from "./sidebar/SiteSettings";
import { Button } from "./ui/Button";

interface SidebarProps {
  base64Image: string | null;
  onAddObstacle: (type: ObstacleType, name?: string) => void;
  onAddPanel: () => void;
  onAutoLayout: () => void;
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
  onClearObstacles?: () => void;
  hasPanels: boolean;
  hasObstacles: boolean;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  projectSettings: ProjectSettings;
  setProjectSettings: (settings: ProjectSettings) => void;
  onOpenAdmin: () => void;
}

export function Sidebar({
  onAddObstacle,
  onAddPanel,
  onAutoLayout,
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
  onClearObstacles,
  hasPanels,
  hasObstacles,
  showGrid,
  setShowGrid,
  projectSettings,
  setProjectSettings,
  onOpenAdmin,
}: SidebarProps) {
  const { handleExportPDF } = usePDFExport();

  return (
    <div className="w-80 h-full overflow-y-auto shrink-0 bg-bg-secondary border-r border-border-color flex flex-col p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3 mb-8">
        <Sun className="text-accent-primary" size={28} />
        <h2 className="text-xl font-semibold">System Designer</h2>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

        {/* Step 1: Site & Environment */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">
              SITE SETTINGS
            </h3>
          </div>
          <SiteSettings settings={projectSettings} onChange={setProjectSettings} />
        </div>

        {/* Step 2: Site Constraints */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">
              OBSTACLES
            </h3>
          </div>
          <ManualObstaclesForm
            onAddObstacle={onAddObstacle}
            onClearObstacles={onClearObstacles}
            hasObstacles={hasObstacles}
          />
        </div>

        {/* Step 3: Hardware & Equipment */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">
              EQUIPMENT
            </h3>
          </div>
          <PanelModelSelector selectedModelId={selectedModelId} onModelChange={onModelChange} />

          <Button variant="secondary" onClick={onOpenAdmin} fullWidth>
            Manage Panel Models
          </Button>
        </div>

        {/* Step 4: Layout & Design */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">
              DESIGN
            </h3>
          </div>
          <DesignTools
            onAddPanel={onAddPanel}
            onAutoLayout={onAutoLayout}
            onClearPanels={onClearPanels}
            hasPanels={hasPanels}
          />
        </div>

        {/* Contextual Editor (Only visible when selecting an item) */}
        <SelectedItemProperties
          activePanel={activePanel}
          activeObstacle={activeObstacle}
          onUpdateObstacle={onUpdateObstacle}
          onUpdatePanel={onUpdatePanel}
          onRemoveObstacle={onRemoveObstacle}
          onRemovePanel={onRemovePanel}
        />
      </div>

      {/* Footer / Global Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button
            variant={showGrid ? "primary" : "secondary"}
            onClick={() => setShowGrid(!showGrid)}
            className="flex-1">
            {showGrid ? "Hide Grid" : "Show Grid"}
          </Button>

          <Button variant="danger" onClick={onReset} title="Start Over">
            <ArrowLeft size={18} />
          </Button>
        </div>

        <Button
          variant="primary"
          onClick={handleExportPDF}
          fullWidth>
          <Download size={20} />
          Export Proposal
        </Button>
      </div>
    </div>
  );
}
