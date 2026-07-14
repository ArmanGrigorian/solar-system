import { useState } from 'react';

/**
 * Hook for handling drag-and-drop or file input image uploads.
 * Converts the image to base64 but does NOT trigger AI analysis.
 * 
 * @param onUploadComplete - Callback fired when image is uploaded and converted.
 * @returns State and event handlers for the drag-and-drop zone.
 */

export function useImageUpload(onUploadComplete: (imageUrls: string[], base64Image: string) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processImages = async (files: File[]) => {
    if (files.length === 0) return;
    setErrorMsg(null);
    setIsAnalyzing(true);
    setProgress(10);
    
    try {
      const urls = files.map(f => URL.createObjectURL(f));
      
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
      reader.readAsDataURL(files[0]);
      
      setProgress(60);
      const dataUrl = await base64Promise;
      const base64Image = dataUrl.split(',')[1];
      
      setProgress(100);
      setTimeout(() => onUploadComplete(urls, base64Image), 300);
      
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to analyze image");
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    processImages(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    processImages(files);
  };

  return {
    isDragging,
    isAnalyzing,
    progress,
    errorMsg,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput
  };
}
