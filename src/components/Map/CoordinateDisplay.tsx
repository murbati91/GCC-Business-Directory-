import { useMapStore } from '../../stores/mapStore';

export function CoordinateDisplay() {
  const { cursorCoords } = useMapStore();

  if (!cursorCoords) return null;

  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
      <div className="flex gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Lng:</span>
          <span className="ml-2 font-mono">{cursorCoords.lng.toFixed(6)}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Lat:</span>
          <span className="ml-2 font-mono">{cursorCoords.lat.toFixed(6)}</span>
        </div>
      </div>
    </div>
  );
}
