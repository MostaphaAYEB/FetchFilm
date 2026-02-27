import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import moviesData from '../data/movies.json';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const movie = moviesData.find((m) => m.id === parseInt(id));

  const handleRent = () => {
    const user = localStorage.getItem('user');
    
    if (!user) {
      navigate('/login');
      return;
    }

    const existingRentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    const alreadyRented = existingRentals.some((rental) => rental.id === movie.id);

    if (alreadyRented) {
      setNotification({ type: 'error', message: 'Vous avez déjà loué ce film' });
      return;
    }

    const rental = {
      ...movie,
      rentalDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    const updatedRentals = [...existingRentals, rental];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));

    setNotification({ type: 'success', message: 'Film loué avec succès !' });

    setTimeout(() => {
      navigate('/my-rentals');
    }, 2000);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-red-600 text-5xl font-bold mb-4">Film introuvable</h1>
        <p className="text-gray-400 mb-8">Le film que vous recherchez n'existe pas.</p>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="relative h-[60vh] w-full">
        <img 
          src={movie.backdrop} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="absolute top-24 left-8 z-10">
          <Button variant="outline" onClick={() => navigate(-1)}>
            &larr; Retour
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-12 flex gap-8">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-64 h-96 object-cover rounded-lg shadow-2xl border-2 border-gray-800"
        />
        
        <div className="pt-32">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-green-400 font-bold">{movie.rating}</span>
            <span className="text-gray-400">{movie.year} • {movie.genre}</span>
          </div>
          <p className="text-lg leading-relaxed text-gray-300 max-w-2xl">
            {movie.description}
          </p>

          <Button size="lg" onClick={handleRent} className="mb-8">
            Louer pour {movie.price}€
          </Button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;