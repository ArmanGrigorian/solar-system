import { MousePointer2, Camera, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useControls } from 'react-zoom-pan-pinch';

export function HUDOverlay() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-5 left-5 bg-glass-bg border border-border-color backdrop-blur-md rounded-sm px-5 py-3 z-30 flex items-center gap-6 shadow-lg">
      <div className="flex items-center gap-2">
        <Camera size={16} className="text-accent-primary" />
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wide">Camera</p>
          <p className="text-sm font-medium">Orthographic</p>
        </div>
      </div>
      
      <div className="h-7.5 w-px bg-border-light" />
      
      <div className="flex items-center gap-2">
        <MousePointer2 size={16} className="text-text-secondary" />
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wide">Mode</p>
          <p className="text-sm font-medium">Drag & Drop</p>
        </div>
      </div>
      
      <div className="h-7.5 w-px bg-border-light" />
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => zoomOut()} 
          className="p-1.5 hover:bg-bg-panel rounded-sm cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button 
          onClick={() => resetTransform()} 
          className="p-1.5 hover:bg-bg-panel rounded-sm cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          title="Reset Zoom"
        >
          <Maximize size={18} />
        </button>
        <button 
          onClick={() => zoomIn()} 
          className="p-1.5 hover:bg-bg-panel rounded-sm cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
}
