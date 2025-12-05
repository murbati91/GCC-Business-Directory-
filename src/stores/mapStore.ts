import { create } from 'zustand';
import type { MapLayer } from '../types';

interface MapState {
  // Map state
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  basemap: 'satellite' | 'streets' | 'hybrid';
  darkMode: boolean;
  
  // Layers
  layers: MapLayer[];
  
  // Panels
  activePanel: string | null;
  collapsedPanels: string[];
  
  // Coordinates
  cursorCoords: { lng: number; lat: number } | null;
  
  // Actions
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setBearing: (bearing: number) => void;
  setPitch: (pitch: number) => void;
  setBasemap: (basemap: 'satellite' | 'streets' | 'hybrid') => void;
  toggleDarkMode: () => void;
  toggleLayer: (layerId: string) => void;
  setActivePanel: (panelId: string | null) => void;
  togglePanelCollapse: (panelId: string) => void;
  setCursorCoords: (coords: { lng: number; lat: number } | null) => void;
}

const defaultLayers: MapLayer[] = [
  { id: 'pois', name: 'POIS', visible: true, type: 'overlay' },
  { id: 'roads', name: 'Roads', visible: true, type: 'overlay' },
  { id: 'basemap', name: 'BASEMAP', visible: true, type: 'base' },
  { id: 'satellite', name: 'Satellite', visible: true, type: 'base' },
];

export const useMapStore = create<MapState>((set) => ({
  // Initial state - Bahrain center
  center: [50.5577, 26.0667],
  zoom: 10,
  bearing: 0,
  pitch: 0,
  basemap: 'hybrid',
  darkMode: false,
  layers: defaultLayers,
  activePanel: null,
  collapsedPanels: [],
  cursorCoords: null,
  
  // Actions
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setBearing: (bearing) => set({ bearing }),
  setPitch: (pitch) => set({ pitch }),
  setBasemap: (basemap) => set({ basemap }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleLayer: (layerId) => set((state) => ({
    layers: state.layers.map((layer) =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ),
  })),
  setActivePanel: (panelId) => set({ activePanel: panelId }),
  togglePanelCollapse: (panelId) => set((state) => ({
    collapsedPanels: state.collapsedPanels.includes(panelId)
      ? state.collapsedPanels.filter((id) => id !== panelId)
      : [...state.collapsedPanels, panelId],
  })),
  setCursorCoords: (cursorCoords) => set({ cursorCoords }),
}));
