import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function MovieHero({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleMoreInfo = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="relative h-[80vh] w-full text-white">
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl pt-20">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
            {movie.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-green-400 font-bold">
              {movie.rating} recommandé
            </span>
            <span className="text-gray-300">{movie.year}</span>
          </div>

          <p className="text-lg text-gray-300 mb-8 line-clamp-3">
            {movie.description}
          </p>

          <div className="flex space-x-4">
            <Button variant="secondary" size="lg" onClick={handleMoreInfo}>
              Plus d’infos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;