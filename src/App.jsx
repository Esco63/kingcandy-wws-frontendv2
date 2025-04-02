import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('dashboard');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="mb-4">
          <button
            onClick={() => setShowRegister(false)}
            className={`px-4 py-2 rounded-l ${!showRegister ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            Login
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className={`px-4 py-2 rounded-r ${showRegister ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            Registrieren
          </button>
        </div>
        {showRegister ? <Register /> : <Login onLogin={handleLogin} />}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">KingCandy WWS</h1>
        <div className="space-x-2">
          <button onClick={() => setPage('dashboard')}>Dashboard</button>
          <button onClick={() => setPage('products')}>Produkte</button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
        </div>
      </div>
      {page === 'dashboard' && <Dashboard />}
      {page === 'products' && <Products />}
    </div>
  );
}

export default App;
