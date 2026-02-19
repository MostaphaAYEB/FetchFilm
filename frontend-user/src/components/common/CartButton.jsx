import { useState } from 'react';

function CartButton({ cartItems = [], removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const cartCount = cartItems.length;

  const toggleShow = () => setShowCart(!showCart);

  return (
    <div className="relative flex items-center">
      <button onClick={toggleShow} className="relative hover:text-gray-300 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>

      {showCart && cartItems.length > 0 && (
        <div className="absolute right-0 top-full mt-4 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
          <ul className="flex flex-col gap-2">
            {cartItems.map((movie) => (
              <li 
                key={movie.id}
                onDoubleClick={() => removeFromCart(movie.id)}
                className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors border-b border-gray-800 last:border-0"
              >
                <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">{movie.title}</span>
                    <span className="text-red-500 text-xs font-bold">{movie.price}€</span>
                  </div>
                  <span className="text-gray-400 text-xs">{movie.year} • {movie.genre}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartButton;