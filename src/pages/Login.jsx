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
      console.error('Fehlerobjekt:', err);
      const fullError = JSON.stringify(err, Object.getOwnPropertyNames(err));
      const responseError = err?.response?.data || err.message || fullError;
      setError('Login fehlgeschlagen: ' + JSON.stringify(responseError));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <input type="text" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 mb-2 rounded" required />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mb-4 rounded" required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Einloggen</button>
    </form>
  );
}
