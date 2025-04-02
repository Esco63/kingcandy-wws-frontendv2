import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return <Login onLogin={(token) => console.log('Logged in mit Token:', token)} />;
}

export default App;
