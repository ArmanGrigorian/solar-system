import { usePanelModels } from "@/context/PanelModelsContext";

interface PanelModelSelectorProps {
  selectedModelId: string;
  onModelChange: (id: string) => void;
}

export function PanelModelSelector({ selectedModelId, onModelChange }: PanelModelSelectorProps) {
  const { panelModels } = usePanelModels();

  return (
    <>
      <select
        value={selectedModelId}
        onChange={(e) => onModelChange(e.target.value)}
        className="bg-bg-panel text-text-primary border border-border-color hover:border-accent-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary p-3 rounded-sm font-sans outline-none transition-all cursor-pointer">
        {panelModels.map((m) => (
          <option key={m.id} value={m.id}>
            {m.manufacturer} - {m.name}
          </option>
        ))}
      </select>
    </>
  );
}
