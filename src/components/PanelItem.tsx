import { motion, type PanInfo } from 'framer-motion';
import type { SolarPanel } from '@/types';

interface PanelItemProps {
  panel: SolarPanel;
  isActive: boolean;
  isError: boolean;
  onDragEnd: (e: MouseEvent | TouchEvent | globalThis.PointerEvent, info: PanInfo) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
}

export function PanelItem({
  panel,
  isActive,
  isError,
  onDragEnd,
  onClick,
  onRemove
}: PanelItemProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`nodrag absolute grid ${panel.width > panel.height ? 'grid-cols-6 grid-rows-4' : 'grid-cols-4 grid-rows-6'} gap-px p-px rounded-xs cursor-grab ${isActive ? 'z-10 border-2 border-accent-primary' : 'z-1 border border-white/20'} ${isError ? 'bg-red-500/80' : 'bg-[#1e3a8a]'}`}
      style={{
        x: panel.position.x,
        y: panel.position.y,
        width: panel.width,
        height: panel.height,
        rotate: panel.rotation
      }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}
    >
      {/* Create the grid pattern inside the solar panel */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="w-full h-full bg-white/10" />
      ))}
      
      {isActive && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute -top-2.5 -right-2.5 bg-accent-danger text-white border-none rounded-full w-5 h-5 cursor-pointer flex items-center justify-center text-[12px] z-20"
        >
          ×
        </button>
      )}
      
      {isActive && (
        <div
          className="absolute -bottom-6.25 left-1/2 -translate-x-1/2 bg-bg-panel/90 backdrop-blur-sm text-text-primary px-1.5 py-0.5 rounded-sm text-[10px] whitespace-nowrap border border-border-color z-20"
        >
          {panel.wattage}W
        </div>
      )}
    </motion.div>
  );
}
