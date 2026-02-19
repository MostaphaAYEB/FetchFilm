import { useState, useEffect } from 'react';

function SearchBar({ movies = [], onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.length >= 2) {
        const filtered = movies.filter(movie => 
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setSuggestions([]);
    setIsOpen(false);
    
    console.log('Film sélectionné :', movie);
    
    if (onSearch) {
      onSearch(movie);
    }
  };

  return (
    <div className="relative flex items-center">
      <button 
        onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) {
                setSearchTerm("");
                setSuggestions([]);
            }
        }} 
        className="hover:text-gray-300 transition-colors mr-2"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
            className="w-48 px-3 py-1 bg-black/80 border border-white/30 rounded text-sm text-white focus:outline-none focus:border-red-600 transition-all duration-300"
            autoFocus
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
              <ul className="py-1">
                {suggestions.map(movie => (
                  <li 
                    key={movie.id}
                    onClick={() => handleSelect(movie)}
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-800 last:border-0"
                  >
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">{movie.title}</span>
                      <span className="text-gray-400 text-xs">{movie.year} • {movie.genre}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;