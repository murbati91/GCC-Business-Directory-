import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 Salahuddin Softtech Solutions (SSS)
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
              About & Sources
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
          
          <div className="text-gray-400 text-sm">
            Bahrain Center: 26.0667°N, 50.5577°E
          </div>
        </div>
      </div>
    </footer>
  );
};
