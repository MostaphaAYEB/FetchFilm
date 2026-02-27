import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nom requis";
    
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
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
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
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
        <h2 className="text-3xl font-bold mb-6">S'inscrire</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input type="text" placeholder="Nom" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
            {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
          </div>
          <div>
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
          </div>
          <div>
            <input type="password" placeholder="Mot de passe" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
          </div>
          <div>
            <input type="password" placeholder="Confirmez le Mot de passe" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full bg-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
            {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-4 transition-colors disabled:opacity-50">
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        
        <p className="text-gray-400 mt-6 text-sm text-center">
          Déjà un compte ? <Link to="/login" className="text-white hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;