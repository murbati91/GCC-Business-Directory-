import { motion } from 'framer-motion';
import { Map, Building2, FileCheck, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';

export const Dashboard = () => {
  const { polygons } = useAppStore();
  
  const stats = [
    { icon: Map, label: 'Total Sites', value: polygons.length, color: 'bg-blue-500' },
    { icon: Building2, label: 'Blueprints Analyzed', value: '0', color: 'bg-purple-500' },
    { icon: FileCheck, label: 'Compliance Checks', value: '0', color: 'bg-green-500' },
    { icon: Mountain, label: 'Elevation Studies', value: '0', color: 'bg-orange-500' },
  ];

  const features = [
    { to: '/map', icon: Map, title: 'Map Explorer', desc: 'Draw and analyze site boundaries', color: 'bg-blue-500' },
    { to: '/blueprint', icon: Building2, title: 'Blueprint AI', desc: 'AI-powered building analysis', color: 'bg-purple-500' },
    { to: '/compliance', icon: FileCheck, title: 'Compliance Check', desc: 'Verify regulatory requirements', color: 'bg-green-500' },
    { to: '/elevation', icon: Mountain, title: 'Elevation Analysis', desc: 'Terrain and elevation studies', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to SSS GeoPoint
            </h1>
            <p className="text-xl text-gray-300">
              Advanced GIS Platform for Bahrain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-center space-x-4">
                  <div className={'p-3 rounded-lg ' + stat.color}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Link key={index} to={feature.to}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={'p-3 rounded-lg ' + feature.color}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
