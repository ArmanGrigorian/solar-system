import { useApp } from '@/hooks/useApp';
import { UploadDashboard } from '@/components/UploadDashboard';
import { MainWorkspace } from '@/components/MainWorkspace';
import { AdminPanel } from '@/components/AdminPanel';
import { PanelModelsProvider } from '@/context/PanelModelsContext';


export default function App() {
  const { roofImages, base64Image, isEditingAdmin, handleUploadComplete, handleReset, toggleAdmin } = useApp();

  return (
    <PanelModelsProvider>
      <div className="w-screen h-screen relative overflow-hidden bg-bg-primary">
        {isEditingAdmin ? (
          <div className="w-full h-full">
            <AdminPanel onClose={toggleAdmin} />
          </div>
        ) : roofImages.length === 0 ? (
          <div className="w-full h-full">
            <UploadDashboard onUploadComplete={handleUploadComplete} onOpenAdmin={toggleAdmin} />
          </div>
        ) : (
          <div className="w-full h-full">
            <MainWorkspace 
              roofImages={roofImages} 
              base64Image={base64Image}
              onReset={handleReset} 
              onOpenAdmin={toggleAdmin}
            />
          </div>
        )}
      </div>
    </PanelModelsProvider>
  );
}
