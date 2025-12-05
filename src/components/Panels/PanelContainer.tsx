import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PanelContainerProps {
  title: string;
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  children: React.ReactNode;
}

export function PanelContainer({
  title,
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
  children,
}: PanelContainerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden',
            isCollapsed ? 'w-12' : 'w-72'
          )}
        >
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 border-b">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleCollapse}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <ChevronLeft
                  size={16}
                  className={cn('transition-transform', isCollapsed ? 'rotate-180' : '')}
                />
              </button>
              {!isCollapsed && <span className="font-medium text-sm">{title}</span>}
            </div>
            {!isCollapsed && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {!isCollapsed && (
            <div className="p-3 max-h-[calc(100vh-200px)] overflow-y-auto">{children}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
