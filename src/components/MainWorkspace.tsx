import { Sidebar } from './Sidebar';
import { CanvasWorkspace } from './CanvasWorkspace';
import { useSolarWorkspace } from '@/hooks/useSolarWorkspace';

interface MainWorkspaceProps {
  roofImages: string[];
  base64Image: string | null;
  onReset: () => void;
}

export function MainWorkspace({ roofImages, base64Image, onReset }: MainWorkspaceProps) {
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
    handleUpdatePanel,
    handleRemovePanel,
    handleAddObstacle,
    handleUpdateObstacle,
    handleRemoveObstacle,
    handleClearPanels,
    showGrid,
    setShowGrid
  } = useSolarWorkspace();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar 
        base64Image={base64Image}
        onAddObstacle={handleAddObstacle}
        onAddPanel={handleAddPanel} 
        onReset={onReset}
        selectedModelId={selectedModelId}
        onModelChange={setSelectedModelId}
        activePanel={panels.find(p => p.id === activePanelId)}
        activeObstacle={obstacles.find(o => o.id === activeObstacleId)}
        onUpdatePanel={handleUpdatePanel}
        onUpdateObstacle={handleUpdateObstacle}
        onRemovePanel={handleRemovePanel}
        onRemoveObstacle={handleRemoveObstacle}
        onClearPanels={handleClearPanels}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
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
        />
      </div>
    </div>
  );
}
