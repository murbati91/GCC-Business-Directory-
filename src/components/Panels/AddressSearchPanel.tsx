import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';
import { PanelContainer } from './PanelContainer';

export function AddressSearchPanel() {
  const { 
    activePanel, 
    setActivePanel,
    collapsedPanels,
    togglePanelCollapse 
  } = useMapStore();

  const [buildingNum, setBuildingNum] = useState('');
  const [roadType, setRoadType] = useState<'num' | 'name'>('num');
  const [roadValue, setRoadValue] = useState('');
  const [blockNum, setBlockNum] = useState('');

  const isOpen = activePanel === 'address';
  const isCollapsed = collapsedPanels.includes('address');

  const handleZoomTo = () => {
    console.log('Zoom to address:', {
      building: buildingNum,
      roadType,
      road: roadValue,
      block: blockNum,
    });
    // Zoom logic would be implemented here
  };

  return (
    <PanelContainer
      title="Address Search"
      isOpen={isOpen}
      isCollapsed={isCollapsed}
      onClose={() => setActivePanel(null)}
      onToggleCollapse={() => togglePanelCollapse('address')}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Building Number</label>
          <input
            type="text"
            value={buildingNum}
            onChange={(e) => setBuildingNum(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter building number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Road Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="num"
                checked={roadType === 'num'}
                onChange={(e) => setRoadType(e.target.value as 'num' | 'name')}
                className="mr-2"
              />
              <span className="text-sm">Road Num</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="name"
                checked={roadType === 'name'}
                onChange={(e) => setRoadType(e.target.value as 'num' | 'name')}
                className="mr-2"
              />
              <span className="text-sm">Road Name</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {roadType === 'num' ? 'Road Number' : 'Road Name'}
          </label>
          <input
            type="text"
            value={roadValue}
            onChange={(e) => setRoadValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={roadType === 'num' ? 'Enter road number' : 'Enter road name'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Block Number</label>
          <input
            type="text"
            value={blockNum}
            onChange={(e) => setBlockNum(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter block number"
          />
        </div>

        <button
          onClick={handleZoomTo}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded font-medium transition-colors"
          style={{ backgroundColor: '#ff6b6b' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ee5a52'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
        >
          <MapPin size={16} />
          Zoom To
        </button>
      </div>
    </PanelContainer>
  );
}
