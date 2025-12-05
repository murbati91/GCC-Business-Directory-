import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();
  const { theme, language, toggleTheme, toggleLanguage } = useAppStore();

  const navLinks = [
    { path: '/', label: 'Dashboard', labelAr: 'لوحة القيادة' },
    { path: '/map', label: 'Map Explorer', labelAr: 'مستكشف الخريطة' },
    { path: '/blueprint', label: 'Blueprint AI', labelAr: 'مخطط الذكاء الاصطناعي' },
    { path: '/compliance', label: 'Compliance Check', labelAr: 'فحص الامتثال' },
    { path: '/elevation', label: 'Elevation Analysis', labelAr: 'تحليل الارتفاع' },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SSS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">GeoPoint</span>
              <span className="text-gray-400 text-xs">Bahrain | SSS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.path);
              const activeClasses = isActive ? 'text-orange-500' : 'text-gray-300 hover:text-white hover:bg-slate-800';
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ' + activeClasses}
                >
                  {language === 'en' ? link.label : link.labelAr}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
