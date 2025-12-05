import { motion } from 'framer-motion';
import { AlertCircle, FileCheck } from 'lucide-react';

export const Compliance = () => {
  const checks = [
    { name: 'Building Height Limits', status: 'pending', icon: AlertCircle, color: 'text-yellow-500' },
    { name: 'Setback Requirements', status: 'pending', icon: AlertCircle, color: 'text-yellow-500' },
    { name: 'Parking Requirements', status: 'pending', icon: AlertCircle, color: 'text-yellow-500' },
    { name: 'Fire Safety Standards', status: 'pending', icon: AlertCircle, color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Compliance Check</h1>
            <p className="text-xl text-gray-300">Verify Regulatory Requirements</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-green-500">
            <div className="flex items-center space-x-4 mb-6">
              <FileCheck className="w-12 h-12 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-white">Bahrain Building Regulations</h2>
                <p className="text-gray-400">Automated compliance verification</p>
              </div>
            </div>

            <div className="space-y-3">
              {checks.map((check, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <check.icon className={'w-6 h-6 ' + check.color} />
                    <span className="text-white font-medium">{check.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm capitalize">{check.status}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-600">
              <button className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
                Run Compliance Check
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
