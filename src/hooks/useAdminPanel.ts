import { useState } from 'react';
import { usePanelModels } from '@/context/PanelModelsContext';
import type { PanelModel } from '@/types';

export function useAdminPanel() {
  const { panelModels, addPanelModel, updatePanelModel, deletePanelModel } = usePanelModels();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PanelModel>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (model: PanelModel) => {
    setEditingId(model.id);
    setFormData(model);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      id: `model-${Math.random().toString(36).substring(2, 9)}`,
      name: '',
      manufacturer: '',
      wattage: 400,
      width: 40,
      height: 65,
      cost: 1000
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.manufacturer) return;
    
    if (isAdding) {
      addPanelModel(formData as PanelModel);
    } else if (editingId) {
      updatePanelModel(editingId, formData);
    }
    
    setEditingId(null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  return {
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
  };
}
