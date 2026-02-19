import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Objet complet soumis :", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm">
      <input 
        name="email" 
        type="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Votre mot de passe"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Valider
      </button>
    </form>
  );
}

export default LoginForm;