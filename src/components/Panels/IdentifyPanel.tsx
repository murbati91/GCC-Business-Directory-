import { useState } from 'react';
import { MapPin, Square, Circle, Trash2 } from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';
import { PanelContainer } from './PanelContainer';

type IdentifyTool = 'point' | 'polygon' | 'rectangle' | 'circle' | null;

export function IdentifyPanel() {
  const { 
    activePanel, 
    setActivePanel,
    collapsedPanels,
    togglePanelCollapse 
  } = useMapStore();

  const [activeTab, setActiveTab] = useState<'identify' | 'result'>('identify');
  const [selectedTool, setSelectedTool] = useState<IdentifyTool>(null);
  const [results, setResults] = useState<any[]>([]);

  const isOpen = activePanel === 'identify';
  const isCollapsed = collapsedPanels.includes('identify');

  const tools = [
    { id: 'point' as const, icon: MapPin, label: 'Point' },
    { id: 'polygon' as const, icon: Square, label: 'Polygon' },
    { id: 'rectangle' as const, icon: Square, label: 'Rectangle' },
    { id: 'circle' as const, icon: Circle, label: 'Circle' },
  ];

  const handleToolClick = (tool: IdentifyTool) => {
    setSelectedTool(selectedTool === tool ? null : tool);
    console.log('Identify tool selected:', tool);
  };

  const handleClear = () => {
    setSelectedTool(null);
    setResults([]);
  };

  return (
    <PanelContainer
      title="Identify"
      isOpen={isOpen}
      isCollapsed={isCollapsed}
      onClose={() => setActivePanel(null)}
      onToggleCollapse={() => togglePanelCollapse('identify')}
    >
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('identify')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'identify'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Identify
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'result'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Result
          </button>
        </div>

        {/* Content */}
        {activeTab === 'identify' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded border transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <tool.icon size={16} />
                  <span className="text-sm">{tool.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleClear}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              <Trash2 size={16} />
              Clear
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No results yet. Use identify tools to query features.
              </p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                >
                  <h4 className="text-sm font-medium mb-2">{result.type}</h4>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {Object.entries(result.properties || {}).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {String(value)}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </PanelContainer>
  );
}
