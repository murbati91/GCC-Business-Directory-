import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapStore } from '../../stores/mapStore';

export function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const { 
    center, 
    zoom, 
    basemap,
    setCursorCoords,
    setCenter,
    setZoom 
  } = useMapStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyle(basemap),
      center: center,
      zoom: zoom,
      minZoom: 6,
      maxZoom: 20,
      attributionControl: false,
    });

    // Add navigation control
    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      'bottom-left'
    );

    // Add scale control
    map.current.addControl(
      new maplibregl.ScaleControl({ maxWidth: 100 }),
      'bottom-right'
    );

    // Track mouse coordinates
    map.current.on('mousemove', (e) => {
      setCursorCoords({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    });

    map.current.on('mouseout', () => {
      setCursorCoords(null);
    });

    // Track map movement
    map.current.on('moveend', () => {
      if (map.current) {
        const center = map.current.getCenter();
        setCenter([center.lng, center.lat]);
        setZoom(map.current.getZoom());
      }
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add Bahrain boundary source
      if (map.current) {
        // Add a marker at Bahrain center
        new maplibregl.Marker({ color: '#f57c00' })
          .setLngLat([50.5577, 26.0667])
          .setPopup(new maplibregl.Popup().setHTML('<h3>Bahrain</h3><p>Kingdom of Bahrain</p>'))
          .addTo(map.current);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update basemap when changed
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setStyle(getMapStyle(basemap));
    }
  }, [basemap, mapLoaded]);

  return (
    <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
  );
}

function getMapStyle(basemap: string): string {
  switch (basemap) {
    case 'satellite':
      return 'https://api.maptiler.com/maps/satellite/style.json?key=get_your_own_key';
    case 'streets':
      return 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key';
    case 'hybrid':
    default:
      // Use OpenStreetMap as fallback
      return {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          },
          satellite: {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '© Esri'
          }
        },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            minzoom: 0,
            maxzoom: 22
          },
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19,
            paint: {
              'raster-opacity': 0.6
            }
          }
        ]
      } as any;
  }
}

export default MapContainer;
