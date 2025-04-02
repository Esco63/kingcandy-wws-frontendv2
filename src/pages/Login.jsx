import { useState } from 'react';
import axios from 'axios';
import warehouseIllustration from '../assets/warehouse-illustration.png'; // Hintergrundbild
import regaleImage from '../assets/Regale.png'; // Regale mit Takis, Lollis, Fanta

const API_URL = import.meta.env.VITE_API_URL;

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      onLogin(res.data.token);
    } catch (err) {
      const readableError = err?.response?.data?.error || err?.message || JSON.stringify(err);
      setError('Login fehlgeschlagen: ' + readableError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE1FF] font-baloo relative overflow-hidden px-4">
      {/* Hintergrundbild */}
      <img
        src={warehouseIllustration}
        alt="Warehouse Illustration"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0"
      />

      {/* Linkes Bild (Regale) */}
      <img
        src={regaleImage}
        alt="Süßwaren Regale"
        className="absolute left-[-3%] bottom-0 w-[55%] object-contain opacity-40 pointer-events-none z-0 hidden md:block"
      />

      {/* Login-Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md z-10 text-center relative"
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://kingcandy-shop.de/wp-content/uploads/2020/11/logo.svg"
            alt="KingCandy Logo"
            className="h-14 max-w-[140px]"
          />
        </div>

        <h2 className="text-xl font-bold text-pink-700 mb-4">Willkommen zurück 👋</h2>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-4/5 border border-pink-300 p-3 mb-3 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-4/5 border border-pink-300 p-3 mb-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-4/5 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 ring-2 ring-pink-200 ring-offset-2"
          >
            🍭 Einloggen
          </button>
        </div>
      </form>
    </div>
  );
}
