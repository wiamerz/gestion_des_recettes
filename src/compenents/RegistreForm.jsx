import React, { useState } from 'react';

function RegistreForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    role: '', 
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Ce champ est obligatoire';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est obligatoire';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d’email invalide';
      isValid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Ce champ est obligatoire';
      isValid = false;
    } else if (!phoneRegex.test(formData.number)) {
      newErrors.number = 'Numéro de téléphone invalide';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Ce champ est obligatoire';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Au moins 6 caractères requis';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Ce champ est obligatoire';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Veuillez choisir un rôle';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setSuccessMessage('');
    setErrors({});

    if (validateForm()) {
      setLoading(true);

      try {
        localStorage.setItem('userData', JSON.stringify(formData));
        setSuccessMessage('Inscription réussie! Redirection en cours...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (error) {
        setErrors(prev => ({ ...prev, general: 'Une erreur est survenue' }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (successMessage) setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-[rgb(108,88,76)] flex items-center justify-center px-4">
      <div className="bg-[rgb(246,233,215)] p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom d'utilisateur */}
          <div>
            <label htmlFor="username" className="block text-black font-medium">Nom d'utilisateur</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.username ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-black font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.email ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="number" className="block text-black font-medium">Numéro de téléphone</label>
            <input
              id="number"
              name="number"
              type="text"
              value={formData.number}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.number ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-black font-medium">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.password ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirmation du mot de passe */}
          <div>
            <label htmlFor="confirmPassword" className="block text-black font-medium">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.confirmPassword ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Sélection du rôle */}
          <div>
            <label htmlFor="role" className="block text-black font-medium">Rôle</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className={`w-full p-2 bg-[rgb(252,243,231)] border-b ${errors.role ? 'border-red-500' : 'border-black'} rounded-lg text-black`}
            >
              <option value="">-- Sélectionner --</option>
              <option value="utilisateur">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className={`w-full text-white p-2 rounded-lg ${loading ? 'bg-gray-500' : 'bg-[rgb(161,193,129)] hover:bg-[rgb(118,189,47)]'}`}
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'S’inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistreForm;
