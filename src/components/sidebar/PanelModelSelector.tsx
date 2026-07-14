import { PANEL_MODELS } from '@/types';

interface PanelModelSelectorProps {
  selectedModelId: string;
  onModelChange: (id: string) => void;
}

export function PanelModelSelector({ selectedModelId, onModelChange }: PanelModelSelectorProps) {
  return (
    <>
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">Panel Model</h3>
      <select 
        value={selectedModelId}
        onChange={(e) => onModelChange(e.target.value)}
        className="bg-glass-bg text-text-primary border border-border-color p-3 rounded-sm font-sans outline-none"
      >
        {PANEL_MODELS.map(m => (
          <option key={m.id} value={m.id}>{m.manufacturer} - {m.name}</option>
        ))}
      </select>
      <div className="h-px bg-border-color my-2" />
    </>
  );
}
