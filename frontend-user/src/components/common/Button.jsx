import React from 'react';

function Button({ children, variant = 'primary', size = 'md', onClick, className = "" }) {
  const baseClasses = 'font-semibold rounded transition-all duration-300 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white shadow-lg',
    secondary: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm',
    outline: 'border-2 border-white/50 hover:border-white text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;