import { useApp } from '@/hooks/useApp';
import { UploadDashboard } from '@/components/UploadDashboard';
import { MainWorkspace } from '@/components/MainWorkspace';


export default function App() {
  const { roofImages, base64Image, handleUploadComplete, handleReset } = useApp();

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-bg-primary">
      {roofImages.length === 0 ? (
        <div className="w-full h-full">
          <UploadDashboard onUploadComplete={handleUploadComplete} />
        </div>
      ) : (
        <div className="w-full h-full">
          <MainWorkspace 
            roofImages={roofImages} 
            base64Image={base64Image}
            onReset={handleReset} 
          />
        </div>
      )}
    </div>
  );
}
