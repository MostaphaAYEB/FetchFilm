import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import CartButton from '../common/CartButton';
import moviesData from '../../data/movies.json';

function Navbar({ cartItems = [], removeFromCart }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-red-600 font-bold' : 'text-gray-300 hover:text-white transition-colors';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="text-red-600 text-3xl font-bold cursor-pointer">
              FETCHFILM
            </h1>
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-rentals" className={navLinkClass}>
                Mes locations
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <SearchBar movies={moviesData} />
          <CartButton cartItems={cartItems} removeFromCart={removeFromCart} />
          <Link to="/login" className="bg-red-600 px-4 py-1.5 rounded font-bold hover:bg-red-700 transition-colors">
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;