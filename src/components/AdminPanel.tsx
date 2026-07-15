import { useAdminPanel } from '@/hooks/useAdminPanel';
import { AdminPanelHeader } from './admin/AdminPanelHeader';
import { AdminPanelTable } from './admin/AdminPanelTable';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const {
    panelModels,
    editingId,
    formData,
    isAdding,
    setFormData,
    handleEdit,
    handleAdd,
    handleSave,
    handleCancel,
    deletePanelModel
  } = useAdminPanel();

  return (
    <div className="w-full h-full bg-bg-primary overflow-auto text-text-primary p-8">
      <div className="max-w-5xl mx-auto">
        <AdminPanelHeader 
          onClose={onClose} 
          onAdd={handleAdd} 
        />

        <AdminPanelTable 
          panelModels={panelModels}
          isAdding={isAdding}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          onEdit={handleEdit}
          onDelete={deletePanelModel}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
