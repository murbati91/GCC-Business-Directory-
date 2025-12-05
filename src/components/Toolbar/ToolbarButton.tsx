import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  color: string;
  isActive?: boolean;
  onClick: () => void;
  tooltip?: string;
}

export function ToolbarButton({ icon, color, isActive, onClick, tooltip }: ToolbarButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all',
        'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2',
        isActive ? 'ring-2 ring-white ring-offset-2' : ''
      )}
      style={{ backgroundColor: color }}
      title={tooltip}
    >
      <span className="text-white">{icon}</span>
    </motion.button>
  );
}
