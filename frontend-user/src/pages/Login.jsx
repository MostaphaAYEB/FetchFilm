import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0]
      }));
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white px-4">
      <div className="mb-8">
        <h1 className="text-red-600 text-4xl font-bold">FETCHFILM</h1>
      </div>
      
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md border border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Se connecter</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
            />
            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-4 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <p className="text-gray-400 mt-6 text-sm text-center">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-white hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;