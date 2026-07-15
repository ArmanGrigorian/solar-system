import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminPanelHeaderProps {
  onClose: () => void;
  onAdd: () => void;
}

export function AdminPanelHeader({ onClose, onAdd }: AdminPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose} className="p-2">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Panel Models Administration</h1>
      </div>
      <Button onClick={onAdd} className="flex items-center gap-2">
        <Plus size={20} />
        Add New Model
      </Button>
    </div>
  );
}
