import React, { useState } from 'react';
import Button from '../common/Button';
import MovieDescription from './MovieDescription';

function MovieCard({ movie }) {
  const [likes, setLikes] = useState(movie.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const genreColors = {
    'Action': 'bg-red-500',
    'Science-Fiction': 'bg-purple-500',
    'Thriller': 'bg-gray-500',
    'Comédie': 'bg-yellow-500'
  };

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 min-w-[200px]">
      <div className="relative aspect-[2/3]">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-yellow-400">
          {movie.rating}
        </div>

        <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${genreColors[movie.genre] || 'bg-gray-600'}`}>
          {movie.genre}
        </div>
      </div>

      {/* Overlay : Ajout de h-full et p-2 pour gagner de la place */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        
        <h3 className="text-sm font-bold text-white mb-1">{movie.title}</h3>
        
        {/* REMPLACEMENT DU <P> PAR LE COMPOSANT DESCRIPTION */}
        <MovieDescription movie={movie} />

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 text-[10px]">Lecture</Button>
            <Button variant="outline" size="sm" className="w-10">+</Button>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); toggleLike(); }}
            className={`text-[10px] py-1 px-2 rounded transition-colors border ${isLiked ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 border-white/20 text-white'}`}
          >
            {isLiked ? '❤️' : '🤍'} {likes}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;