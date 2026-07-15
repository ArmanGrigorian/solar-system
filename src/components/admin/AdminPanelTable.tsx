import { Button } from "@/components/ui/Button";
import type { PanelModel } from "@/types";
import { Save, X } from "lucide-react";
import { AdminPanelRow } from "./AdminPanelRow";

interface AdminPanelTableProps {
  panelModels: PanelModel[];
  isAdding: boolean;
  editingId: string | null;
  formData: Partial<PanelModel>;
  setFormData: (data: Partial<PanelModel>) => void;
  onEdit: (model: PanelModel) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AdminPanelTable({
  panelModels,
  isAdding,
  editingId,
  formData,
  setFormData,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: AdminPanelTableProps) {
  return (
    <div className="bg-bg-secondary border border-border-color rounded-sm overflow-hidden shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-glass-bg border-b border-border-color text-text-secondary">
            <th className="p-4 font-medium">Manufacturer</th>
            <th className="p-4 font-medium">Name</th>
            <th className="p-4 font-medium">Wattage (W)</th>
            <th className="p-4 font-medium">Dimensions (W×H)</th>
            <th className="p-4 font-medium">Cost ($)</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr className="border-b border-border-color bg-glass-bg">
              <td className="p-4">
                <input
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.manufacturer || ""}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  placeholder="Manufacturer"
                />
              </td>
              <td className="p-4">
                <input
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Model Name"
                />
              </td>
              <td className="p-4">
                <input
                  type="number"
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.wattage || 0}
                  onChange={(e) => setFormData({ ...formData, wattage: Number(e.target.value) })}
                />
              </td>
              <td className="p-4 flex gap-2">
                <input
                  type="number"
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.width || 0}
                  onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                  placeholder="W"
                />
                <input
                  type="number"
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.height || 0}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  placeholder="H"
                />
              </td>
              <td className="p-4">
                <input
                  type="number"
                  className="w-full bg-bg-primary border border-border-color p-2 rounded text-sm"
                  value={formData.cost || 0}
                  onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                />
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="primary" onClick={onSave} className="p-2">
                    <Save size={16} />
                  </Button>
                  <Button variant="ghost" onClick={onCancel} className="p-2">
                    <X size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          )}

          {panelModels.map((model) => (
            <AdminPanelRow
              key={model.id}
              model={model}
              isEditing={editingId === model.id}
              formData={formData}
              setFormData={setFormData}
              onEdit={onEdit}
              onDelete={onDelete}
              onSave={onSave}
              onCancel={onCancel}
            />
          ))}

          {panelModels.length === 0 && !isAdding && (
            <tr>
              <td colSpan={6} className="p-8 text-center text-text-secondary">
                No panel models found. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
