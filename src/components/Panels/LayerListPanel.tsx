import { Eye, EyeOff, ChevronRight, GripVertical } from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';
import { PanelContainer } from './PanelContainer';

export function LayerListPanel() {
  const { 
    activePanel, 
    setActivePanel, 
    layers, 
    toggleLayer,
    collapsedPanels,
    togglePanelCollapse 
  } = useMapStore();

  const isOpen = activePanel === 'layers';
  const isCollapsed = collapsedPanels.includes('layers');

  return (
    <PanelContainer
      title="Layer List"
      isOpen={isOpen}
      isCollapsed={isCollapsed}
      onClose={() => setActivePanel(null)}
      onToggleCollapse={() => togglePanelCollapse('layers')}
    >
      <div className="space-y-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <GripVertical size={14} className="text-gray-400 cursor-grab" />
            <ChevronRight size={14} className="text-gray-400" />
            <button
              onClick={() => toggleLayer(layer.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              {layer.visible ? (
                <Eye size={16} className="text-blue-500" />
              ) : (
                <EyeOff size={16} className="text-gray-400" />
              )}
            </button>
            <span className="text-sm flex-1">{layer.name}</span>
          </div>
        ))}
      </div>
    </PanelContainer>
  );
}
