import type { Obstacle } from '@/types';
import { motion, type PanInfo } from 'framer-motion';

interface ObstacleItemProps {
  obstacle: Obstacle;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onResizeEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export function ObstacleItem({ obstacle, isActive, onClick, onDragEnd, onResizeEnd }: ObstacleItemProps) {
  const getObstacleColor = (type: string) => {
    switch(type) {
      case 'chimney': return 'rgba(239, 68, 68, 0.4)';
      case 'skylight': return 'rgba(59, 130, 246, 0.4)';
      case 'tree': return 'rgba(34, 197, 94, 0.4)';
      default: return 'rgba(156, 163, 175, 0.4)';
    }
  };

  const bgColor = getObstacleColor(obstacle.type);
  const borderColor = bgColor.replace('0.4', '1');

  return (
    <motion.div
      drag
      dragMomentum={false}
      onClick={onClick}
      onDragEnd={onDragEnd}
      className={`nodrag absolute flex items-center justify-center cursor-grab z-5 ${isActive ? 'ring-2 ring-accent-primary' : ''}`}
      style={{
        x: obstacle.position.x,
        y: obstacle.position.y,
        width: obstacle.width,
        height: obstacle.height,
        borderRadius: obstacle.borderRadius !== undefined ? `${obstacle.borderRadius}%` : '0%',
        backgroundColor: bgColor,
        border: isActive ? `2px solid var(--color-accent-primary)` : `2px dashed ${borderColor}`
      }}
      whileDrag={{ cursor: 'grabbing', zIndex: 10 }}
    >
      <div 
        className="bg-black/85 text-white px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wide"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {obstacle.name ? `${obstacle.type}: ${obstacle.name}` : obstacle.type}
      </div>
      
      {/* Resize Handle */}
      <motion.div
        key={`${obstacle.width}-${obstacle.height}`}
        drag
        dragMomentum={false}
        onDragEnd={onResizeEnd}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-20 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
        style={{
          background: borderColor
        }}
      />
    </motion.div>
  );
}
