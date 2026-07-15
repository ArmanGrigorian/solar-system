import { usePanelModels } from "@/context/PanelModelsContext";
import type { ProjectSettings } from "@/types";
import { useState } from "react";
import { useAutoLayout } from "./useAutoLayout";
import { useObstacles } from "./useObstacles";
import { usePanels } from "./usePanels";

export function useSolarWorkspace() {
  const { panelModels } = usePanelModels();

  const [selectedModelId, setSelectedModelId] = useState<string>(
    panelModels.length > 0 ? panelModels[0].id : "",
  );

  const [showGrid, setShowGrid] = useState<boolean>(false);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    azimuth: "South",
    pitch: 20,
  });

  const {
    panels,
    activePanelId,
    setActivePanelId,
    handleAddPanel,
    handleUpdatePanel,
    handleRemovePanel,
    handleClearPanels,
    setRawPanels,
  } = usePanels(panelModels, selectedModelId);

  const {
    obstacles,
    activeObstacleId,
    setActiveObstacleId,
    handleAddObstacle,
    handleUpdateObstacle,
    handleRemoveObstacle,
    handleClearObstacles,
  } = useObstacles();

  const selectedModel = panelModels.find((m) => m.id === selectedModelId) || panelModels[0];

  // Assuming the roof image is 80% of the canvas centered
  const canvasWidth = window.innerWidth - 320;
  const canvasHeight = window.innerHeight;
  const imageBounds = {
    x: canvasWidth * 0.1,
    y: canvasHeight * 0.1,
    w: canvasWidth * 0.8,
    h: canvasHeight * 0.8,
  };

  const handleAutoLayout = useAutoLayout(obstacles, selectedModel, imageBounds, setRawPanels);

  return {
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
    handleClearObstacles,
    handleClearPanels,
    showGrid,
    setShowGrid,
    projectSettings,
    setProjectSettings,
  };
}
