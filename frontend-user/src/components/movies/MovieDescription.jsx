import React, { useState } from 'react';

function MovieDescription({ movie }) {
    
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = movie?.description || "";
  const isLongText = fullText.length > 100;
  
  const textToShow = isExpanded 
    ? fullText 
    : fullText.slice(0, 100) + (isLongText ? '...' : '');

  return (
    <div className="mt-1">
      <p className={`text-xs text-gray-400 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {textToShow}
      </p>
      
      {isLongText && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-500 text-xs font-bold mt-1 hover:underline"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
}

export default MovieDescription;