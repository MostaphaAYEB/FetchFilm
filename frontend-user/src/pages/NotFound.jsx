import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-red-600 text-9xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-bold mb-4">Page introuvable</h2>
      <p className="text-gray-400 mb-8">Oups ! La page que vous recherchez n'existe pas...</p>
      <Link to="/" className="bg-red-600 px-6 py-3 rounded font-bold hover:bg-red-700 transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;