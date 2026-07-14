import { UploadCloud, Settings } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useRef } from "react";

interface UploadDashboardProps {
  onUploadComplete: (imageUrls: string[], base64Image: string) => void;
}

export function UploadDashboard({ onUploadComplete }: UploadDashboardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    isAnalyzing,
    progress,
    errorMsg,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput
  } = useImageUpload(onUploadComplete);

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="max-w-200 w-full text-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-accent-primary bg-clip-text text-transparent">
            Solar CAD System
          </h1>
          <p className="text-text-secondary">Professional rooftop modeling & AI analysis</p>
        </div>

        {errorMsg && !isAnalyzing && (
          <div className="bg-accent-danger/10 border border-accent-danger p-4 rounded-sm mb-8 text-accent-danger">
            <p><strong>Error:</strong> {errorMsg}</p>
          </div>
        )}

        {!isAnalyzing ? (
          <div
            className={`bg-glass-bg border-2 border-dashed ${isDragging ? 'border-accent-primary bg-green-400/5' : 'border-border-color'} rounded-sm p-12 text-center transition-all duration-200 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleFileInput}
              ref={fileInputRef}
              className="hidden"
            />
            <UploadCloud size={48} className="text-accent-primary mb-4 mx-auto" />
            <h3 className="text-xl font-medium mb-2">Drop aerial roof image here</h3>
            <p className="text-text-muted text-sm">Supports high-res JPG, PNG</p>
          </div>
        ) : (
          <div className="bg-glass-bg border border-glass-border rounded-sm p-12 text-left">
            <div className="flex items-center gap-4 mb-8">
              <Settings className="text-accent-primary animate-[spin_4s_linear_infinite]" size={32} />
              <div>
                <h3 className="text-xl font-medium">Processing Image</h3>
                <p className="text-text-secondary">Loading high-resolution drone imagery...</p>
              </div>
            </div>
            
            <div className="h-2 bg-bg-secondary rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-accent-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {errorMsg && (
              <div className="bg-accent-danger/10 border border-accent-danger p-4 rounded-sm mt-4 text-accent-danger">
                <p><strong>Error:</strong> {errorMsg}</p>
              </div>
            )}
            
            <div className="flex justify-between text-sm text-text-secondary">
              <span>{progress < 50 ? 'Reading file...' : progress < 90 ? 'Generating base64...' : 'Finalizing...'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
