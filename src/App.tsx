import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { MapExplorer } from './pages/MapExplorer';
import { Blueprint } from './pages/Blueprint';
import { Compliance } from './pages/Compliance';
import { Elevation } from './pages/Elevation';
import { useAppStore } from './stores/appStore';
import { useEffect } from 'react';

function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/blueprint" element={<Blueprint />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/elevation" element={<Elevation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
