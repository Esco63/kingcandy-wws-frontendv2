import { useState } from 'react';
import axios from 'axios';
import loginIllustration from '../assets/login-illustration.png'; // Bild lokal einbinden, optional

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
    <div className="min-h-screen flex items-center justify-center bg-[#FFE1FF] font-baloo">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://kingcandy-shop.de/wp-content/uploads/2020/11/logo.svg"
            alt="KingCandy Logo"
            className="h-14 max-w-[160px]"
          />
        </div>

        <h2 className="text-2xl font-extrabold text-pink-700 mb-4">Willkommen zurück 🍬</h2>

        <img
          src="/login-illustration.png"
          alt="Login Illustration"
          className="w-full h-auto rounded-xl shadow mb-4"
        />

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
            className="w-4/5 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full transition shadow-md"
          >
            Einloggen
          </button>
        </div>
      </form>
    </div>
  );
}
