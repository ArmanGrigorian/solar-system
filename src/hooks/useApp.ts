import { useState } from 'react';

/**
 * Main application hook that manages the highest-level state of the app.
 * Handles the transition between the upload screen and the main workspace
 * by keeping track of the uploaded images and detected AI obstacles.
 * 
 * @returns State and setter for uploaded images, detected obstacles, and upload handler.
 */

export function useApp() {
  const [roofImages, setRoofImages] = useState<string[]>([]);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);

  const handleUploadComplete = (urls: string[], base64: string) => {
    setRoofImages(urls);
    setBase64Image(base64);
  };

  const handleReset = () => {
    setRoofImages([]);
    setBase64Image(null);
  };

  const toggleAdmin = () => setIsEditingAdmin(!isEditingAdmin);

  return {
    roofImages,
    base64Image,
    isEditingAdmin,
    handleUploadComplete,
    handleReset,
    toggleAdmin
  };
}
