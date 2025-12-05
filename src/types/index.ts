export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  type: 'base' | 'overlay';
  children?: MapLayer[];
}

export interface Panel {
  id: string;
  title: string;
  isOpen: boolean;
  isCollapsed: boolean;
}

export interface SearchResult {
  id: string;
  type: 'parcel' | 'building' | 'road' | 'block';
  title: string;
  description: string;
  coordinates: [number, number];
}

export interface Coordinates {
  lng: number;
  lat: number;
  utm?: { x: number; y: number };
}
