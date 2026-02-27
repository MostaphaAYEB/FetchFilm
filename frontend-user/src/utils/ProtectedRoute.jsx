import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Pour l'instant, on simule avec localStorage
  const isAuthenticated = localStorage.getItem('user') != null;

  if (!isAuthenticated) {
    // Redirection vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;