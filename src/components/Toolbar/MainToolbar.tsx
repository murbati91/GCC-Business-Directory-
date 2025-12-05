import { Layers, MapPin, Info, Search, MoreHorizontal } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { useMapStore } from '../../stores/mapStore';

const toolbarButtons = [
  { id: 'layers', icon: Layers, color: '#f57c00', tooltip: 'Layer List' },
  { id: 'address', icon: MapPin, color: '#4caf50', tooltip: 'Address Search' },
  { id: 'identify', icon: Info, color: '#795548', tooltip: 'Identify Tool' },
  { id: 'search', icon: Search, color: '#607d8b', tooltip: 'Advanced Search' },
  { id: 'more', icon: MoreHorizontal, color: '#9e9e9e', tooltip: 'More Tools' },
];

export function MainToolbar() {
  const { activePanel, setActivePanel } = useMapStore();

  const handleClick = (id: string) => {
    setActivePanel(activePanel === id ? null : id);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
      {toolbarButtons.map((button) => (
        <ToolbarButton
          key={button.id}
          icon={<button.icon size={20} />}
          color={button.color}
          isActive={activePanel === button.id}
          onClick={() => handleClick(button.id)}
          tooltip={button.tooltip}
        />
      ))}
    </div>
  );
}
