import { useEffect } from 'react';

interface KeyboardShortcutsOptions {
  activePanelId: string | null;
  activeObstacleId: string | null;
  onRemovePanel: (id: string) => void;
  onRemoveObstacle: (id: string) => void;
  setActivePanelId: (id: string | null) => void;
  setActiveObstacleId: (id: string | null) => void;
}

export function useKeyboardShortcuts({
  activePanelId,
  activeObstacleId,
  onRemovePanel,
  onRemoveObstacle,
  setActivePanelId,
  setActiveObstacleId
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        
        if (activePanelId) {
          onRemovePanel(activePanelId);
          setActivePanelId(null);
        } else if (activeObstacleId) {
          onRemoveObstacle(activeObstacleId);
          setActiveObstacleId(null);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanelId, activeObstacleId, onRemovePanel, onRemoveObstacle, setActivePanelId, setActiveObstacleId]);
}
