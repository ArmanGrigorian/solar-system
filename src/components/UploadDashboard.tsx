import { useImageUpload } from "@/hooks/useImageUpload";
import { Settings, UploadCloud } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/Button";

interface UploadDashboardProps {
  onUploadComplete: (imageUrls: string[], base64Image: string) => void;
  onOpenAdmin: () => void;
}

export function UploadDashboard({ onUploadComplete, onOpenAdmin }: UploadDashboardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    isAnalyzing,
    progress,
    errorMsg,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
  } = useImageUpload(onUploadComplete);

  return (
    <div className="h-full w-full flex items-center justify-center p-8 relative">
      <div className="absolute top-8 right-8">
        <Button variant="secondary" onClick={onOpenAdmin}>
          Manage Panel Models
        </Button>
      </div>
      <div className="max-w-200 w-full text-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-accent-primary bg-clip-text text-transparent">
            Solar CAD System
          </h1>
          <p className="text-text-secondary">Professional rooftop modeling & AI analysis</p>
        </div>

        {errorMsg && !isAnalyzing && (
          <div className="bg-accent-danger/10 border border-accent-danger p-4 rounded-sm mb-8 text-accent-danger">
            <p>
              <strong>Error:</strong> {errorMsg}
            </p>
          </div>
        )}

        {!isAnalyzing ? (
          <div
            className={`glass-panel border-2 border-dashed ${isDragging ? "border-accent-primary bg-accent-primary/5" : "border-border-light hover:border-accent-primary/50"} rounded-sm p-16 text-center transition-all duration-300 cursor-pointer group`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              ref={fileInputRef}
              className="hidden"
            />
            <UploadCloud
              size={64}
              className="text-accent-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
            <h3 className="text-2xl font-medium mb-3 text-white">Drop aerial roof image here</h3>
            <p className="text-text-secondary">Supports high-res JPG, PNG</p>
          </div>
        ) : (
          <div className="glass-panel border border-border-color rounded-sm p-16 text-left">
            <div className="flex items-center gap-6 mb-10">
              <Settings
                className="text-accent-primary animate-[spin_4s_linear_infinite]"
                size={40}
              />
              <div>
                <h3 className="text-2xl font-medium text-white mb-1">Processing Image</h3>
                <p className="text-text-secondary">Loading high-resolution drone imagery...</p>
              </div>
            </div>

            <div className="h-3 bg-bg-secondary rounded-full overflow-hidden mb-4 shadow-inner">
              <div
                className="h-full bg-linear-to-r from-accent-primary to-accent-primary-hover shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {errorMsg && (
              <div className="bg-accent-danger/10 border border-accent-danger p-4 rounded-sm mt-4 text-accent-danger">
                <p>
                  <strong>Error:</strong> {errorMsg}
                </p>
              </div>
            )}

            <div className="flex justify-between text-sm text-text-secondary">
              <span>
                {progress < 50
                  ? "Reading file..."
                  : progress < 90
                    ? "Generating base64..."
                    : "Finalizing..."}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
