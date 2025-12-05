import { motion } from 'framer-motion';
import { Upload, FileText, Zap } from 'lucide-react';

export const Blueprint = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blueprint AI</h1>
            <p className="text-xl text-gray-300">AI-Powered Building Analysis</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-purple-500">
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Upload Building Plans</h3>
                <p className="text-gray-400">Drag and drop or click to upload PDF or image files</p>
              </div>
              <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors">
                Select Files
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <FileText className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Automatic Extraction</h3>
              <p className="text-gray-400 text-sm">Extract dimensions, room layouts, and structural elements automatically</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <Zap className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant Analysis</h3>
              <p className="text-gray-400 text-sm">Get compliance insights and recommendations in seconds</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
