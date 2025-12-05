import { create } from 'zustand';

interface Polygon {
  id: string;
  name: string;
  coordinates: number[][][];
  area: number;
  createdAt: Date;
}

interface AppStore {
  theme: 'dark' | 'light';
  language: 'en' | 'ar';
  polygons: Polygon[];
  toggleTheme: () => void;
  toggleLanguage: () => void;
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (id: string) => void;
  clearPolygons: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'dark',
  language: 'en',
  polygons: [],
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),
  
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'en' ? 'ar' : 'en' 
  })),
  
  addPolygon: (polygon) => set((state) => ({ 
    polygons: [...state.polygons, polygon] 
  })),
  
  removePolygon: (id) => set((state) => ({ 
    polygons: state.polygons.filter(p => p.id !== id) 
  })),
  
  clearPolygons: () => set({ polygons: [] }),
}));
