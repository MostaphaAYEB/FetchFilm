import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieDescription from './MovieDescription';

function MovieCard({ movie, onAddToCart }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(movie.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group/card relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 w-48 bg-gray-900"
    >
      <div className="relative aspect-[2/3]">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-yellow-400">
          {movie.rating}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-sm font-bold text-white mb-1 truncate">{movie.title}</h3>
        
        <MovieDescription movie={movie} />

        <div className="flex flex-col gap-2 mt-2">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (onAddToCart) onAddToCart(movie); 
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-[10px] py-2 rounded font-bold transition-colors flex justify-between px-3"
          >
            <span>Louer</span>
            <span>{movie.price}€</span>
          </button>
          
          <button 
            onClick={toggleLike}
            className={`text-[10px] py-1.5 rounded transition-colors border flex items-center justify-center gap-1 ${
              isLiked ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 border-white/20 text-white'
            }`}
          >
            {isLiked ? '❤️' : '🤍'} {likes}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;