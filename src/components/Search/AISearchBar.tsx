import { useState } from 'react';
import { Search, Mic } from 'lucide-react';

type SearchType = 'Parcel' | 'Building' | 'Road' | 'Block';

export function AISearchBar() {
  const [searchType, setSearchType] = useState<SearchType>('Parcel');
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const handleSearch = () => {
    console.log('Searching for:', { searchType, query });
    // Search logic would be implemented here
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as SearchType)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Parcel">Parcel</option>
        <option value="Building">Building</option>
        <option value="Road">Road</option>
        <option value="Block">Block</option>
      </select>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or ask AI..."
        className="px-3 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      
      <button
        onClick={handleVoiceClick}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isListening ? 'bg-red-100 dark:bg-red-900' : ''
        }`}
        title="Voice search"
      >
        <Mic size={20} className={isListening ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'} />
      </button>
      
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        title="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
}
