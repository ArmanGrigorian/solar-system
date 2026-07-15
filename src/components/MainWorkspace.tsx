import { useSolarWorkspace } from "@/hooks/useSolarWorkspace";
import { CanvasWorkspace } from "./CanvasWorkspace";
import { Sidebar } from "./Sidebar";

interface MainWorkspaceProps {
  roofImages: string[];
  base64Image: string | null;
  onReset: () => void;
  onOpenAdmin: () => void;
}

export function MainWorkspace({
  roofImages,
  base64Image,
  onReset,
  onOpenAdmin,
}: MainWorkspaceProps) {
  const {
    panels,
    obstacles,
    selectedModelId,
    setSelectedModelId,
    activePanelId,
    setActivePanelId,
    activeObstacleId,
    setActiveObstacleId,
    handleAddPanel,
    handleAutoLayout,
    handleUpdatePanel,
    handleRemovePanel,
    handleAddObstacle,
    handleUpdateObstacle,
    handleRemoveObstacle,
    handleClearPanels,
    handleClearObstacles,
    showGrid,
    setShowGrid,
    projectSettings,
    setProjectSettings,
  } = useSolarWorkspace();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        base64Image={base64Image}
        onAddObstacle={handleAddObstacle}
        onAddPanel={handleAddPanel}
        onAutoLayout={handleAutoLayout}
        onReset={onReset}
        selectedModelId={selectedModelId}
        onModelChange={setSelectedModelId}
        activePanel={panels.find((p) => p.id === activePanelId)}
        activeObstacle={obstacles.find((o) => o.id === activeObstacleId)}
        onUpdatePanel={handleUpdatePanel}
        onUpdateObstacle={handleUpdateObstacle}
        onRemovePanel={handleRemovePanel}
        onRemoveObstacle={handleRemoveObstacle}
        hasPanels={panels.length > 0}
        hasObstacles={obstacles.length > 0}
        onClearPanels={handleClearPanels}
        onClearObstacles={handleClearObstacles}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        projectSettings={projectSettings}
        setProjectSettings={setProjectSettings}
        onOpenAdmin={onOpenAdmin}
      />

      <div className="flex-1 relative">
        <CanvasWorkspace
          roofImage={roofImages[0]}
          panels={panels}
          obstacles={obstacles}
          activePanelId={activePanelId}
          setActivePanelId={setActivePanelId}
          activeObstacleId={activeObstacleId}
          setActiveObstacleId={setActiveObstacleId}
          onUpdatePanel={handleUpdatePanel}
          onRemovePanel={handleRemovePanel}
          onUpdateObstacle={handleUpdateObstacle}
          onRemoveObstacle={handleRemoveObstacle}
          showGrid={showGrid}
          projectSettings={projectSettings}
        />
      </div>
    </div>
  );
}
