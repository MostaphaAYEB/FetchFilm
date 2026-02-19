import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import MovieFilter from '../components/movies/MovieFilter';
import Footer from '../components/layout/Footer';
import moviesData from '../data/movies.json';

function Home() {
  const [allMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [cartItems, setCartItems] = useState([]);

  const featuredMovie = allMovies[0];

  const addToCart = (movie) => {
    if (!cartItems.find(item => item.id === movie.id)) {
      setCartItems([...cartItems, movie]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
      
      <MovieHero movie={featuredMovie} />
      
      <div className="-mt-32 relative z-10 space-y-4 pb-12">
        <div className="container mx-auto relative z-20 pt-8">
          <MovieFilter 
            movies={allMovies} 
            onFilter={setFilteredMovies} 
          />
        </div>

        <MovieCarousel 
          title="Films disponibles" 
          movies={filteredMovies} 
          onAddToCart={addToCart}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;