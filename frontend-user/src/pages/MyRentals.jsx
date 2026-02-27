import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

function MyRentals() {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl font-bold mb-12">Mes locations</h1>
        
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-24 h-24 text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1h-4m-4 0v16" />
          </svg>
          <p className="text-xl text-gray-400 mb-8">Aucune location pour le moment</p>
          <Link to="/" className="bg-red-600 px-6 py-3 rounded font-bold hover:bg-red-700 transition-colors">
            Découvrir des films
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyRentals;