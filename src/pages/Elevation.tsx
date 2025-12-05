import { motion } from 'framer-motion';
import { Mountain, TrendingUp, MapPin } from 'lucide-react';

export const Elevation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Elevation Analysis</h1>
            <p className="text-xl text-gray-300">Terrain and Elevation Studies</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-orange-500">
            <div className="flex items-center space-x-4 mb-6">
              <Mountain className="w-12 h-12 text-orange-500" />
              <div>
                <h2 className="text-2xl font-bold text-white">Topographic Analysis</h2>
                <p className="text-gray-400">High-resolution elevation data for Bahrain</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Location</p>
                <p className="text-2xl font-bold text-white">--</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <Mountain className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Elevation</p>
                <p className="text-2xl font-bold text-white">-- m</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">Slope</p>
                <p className="text-2xl font-bold text-white">-- °</p>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                Select Point on Map
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Digital Elevation Model (DEM) analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Contour line generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Slope and aspect calculation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Watershed analysis</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
