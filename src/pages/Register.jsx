import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await axios.post(`${API_URL}/register`, { username, password, role });
      setMessage('✅ Benutzer erfolgreich erstellt!');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage('❌ Fehler: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Benutzer registrieren</h2>
        {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
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
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="admin">Admin</option>
          <option value="lagerist">Lagerist</option>
          <option value="verkäufer">Verkäufer</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded" type="submit">
          Benutzer anlegen
        </button>
      </form>
    </div>
  );
}
