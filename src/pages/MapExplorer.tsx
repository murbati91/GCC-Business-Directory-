import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useAppStore } from '../stores/appStore';
import { ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
import * as turf from '@turf/turf';

export const MapExplorer = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { polygons, addPolygon, removePolygon } = useAppStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'esri-satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: 'Tiles &copy; Esri'
          },
          'esri-labels': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'satellite',
            type: 'raster',
            source: 'esri-satellite',
            minzoom: 0,
            maxzoom: 19,
          },
          {
            id: 'labels',
            type: 'raster',
            source: 'esri-labels',
            minzoom: 0,
            maxzoom: 19,
          }
        ],
      },
      center: [50.5577, 26.0667],
      zoom: 10,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-right');

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'simple_select',
    });

    map.current.addControl(draw.current as any, 'top-left');

    map.current.on('draw.create', (e: any) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        if (feature.geometry.type === 'Polygon') {
          const area = turf.area(feature);
          const polygon = {
            id: feature.id as string,
            name: 'Site ' + (polygons.length + 1),
            coordinates: feature.geometry.coordinates as number[][][],
            area: area,
            createdAt: new Date(),
          };
          addPolygon(polygon);
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleRemovePolygon = (id: string) => {
    if (draw.current) {
      draw.current.delete(id);
    }
    removePolygon(id);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-900">
      <div className={'transition-all duration-300 bg-slate-800 border-r border-slate-700 overflow-y-auto ' + (showSidebar ? 'w-80' : 'w-0')}>
        {showSidebar && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Map Explorer</h2>
              <p className="text-gray-400 text-sm">Draw site boundaries on the map</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">How to use:</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">1</span>
                  <span>Click the polygon tool in the map</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">2</span>
                  <span>Click points to draw your site boundary</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">3</span>
                  <span>Double-click to complete the polygon</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">4</span>
                  <span>View area calculations below</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Drawn Sites ({polygons.length})
              </h3>
              <div className="space-y-2">
                {polygons.length === 0 ? (
                  <p className="text-gray-500 text-sm">No sites drawn yet</p>
                ) : (
                  polygons.map((polygon) => (
                    <div
                      key={polygon.id}
                      className="bg-slate-700 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-medium text-sm">{polygon.name}</p>
                        <p className="text-gray-400 text-xs">
                          {(polygon.area / 10000).toFixed(2)} hectares
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemovePolygon(polygon.id)}
                        className="p-1.5 hover:bg-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute left-4 top-4 z-10 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg shadow-lg transition-colors"
        >
          {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
};
