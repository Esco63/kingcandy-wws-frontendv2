import { useState } from 'react';
import axios from 'axios';

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
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img src="https://kingcandy-shop.de/wp-content/uploads/2020/11/logo.svg" alt="KingCandy Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">Login</h2>
        {error && <p className="mb-4 text-sm text-center text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition">
          Einloggen
        </button>
      </form>
    </div>
  );
}
