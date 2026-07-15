import { Trash2, Edit2, Save, X } from 'lucide-react';
import type { PanelModel } from '@/types';
import { Button } from '@/components/ui/Button';

interface AdminPanelRowProps {
  model: PanelModel;
  isEditing: boolean;
  formData: Partial<PanelModel>;
  setFormData: (data: Partial<PanelModel>) => void;
  onEdit: (model: PanelModel) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AdminPanelRow({
  model,
  isEditing,
  formData,
  setFormData,
  onEdit,
  onDelete,
  onSave,
  onCancel
}: AdminPanelRowProps) {
  if (isEditing) {
    return (
      <tr className="border-b border-border-color bg-glass-bg">
        <td className="p-4"><input className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.manufacturer || ''} onChange={e => setFormData({...formData, manufacturer: e.target.value})} placeholder="Manufacturer" /></td>
        <td className="p-4"><input className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Model Name" /></td>
        <td className="p-4"><input type="number" className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.wattage || 0} onChange={e => setFormData({...formData, wattage: Number(e.target.value)})} /></td>
        <td className="p-4 flex gap-2">
          <input type="number" className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.width || 0} onChange={e => setFormData({...formData, width: Number(e.target.value)})} placeholder="W" />
          <input type="number" className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.height || 0} onChange={e => setFormData({...formData, height: Number(e.target.value)})} placeholder="H" />
        </td>
        <td className="p-4"><input type="number" className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm" value={formData.cost || 0} onChange={e => setFormData({...formData, cost: Number(e.target.value)})} /></td>
        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <Button variant="primary" onClick={onSave} className="p-2"><Save size={16} /></Button>
            <Button variant="ghost" onClick={onCancel} className="p-2"><X size={16} /></Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-border-color hover:bg-glass-bg transition-colors">
      <td className="p-4">{model.manufacturer}</td>
      <td className="p-4">{model.name}</td>
      <td className="p-4">{model.wattage}W</td>
      <td className="p-4">{model.width}" × {model.height}"</td>
      <td className="p-4">${model.cost}</td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => onEdit(model)} className="p-2 text-text-secondary hover:text-white"><Edit2 size={16} /></Button>
          <Button variant="ghost" onClick={() => onDelete(model.id)} className="p-2 text-text-secondary hover:text-accent-danger"><Trash2 size={16} /></Button>
        </div>
      </td>
    </tr>
  );
}
