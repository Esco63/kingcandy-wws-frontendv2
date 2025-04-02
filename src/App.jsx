import Login from './pages/Login';

function App() {
  return <Login onLogin={(token) => console.log('Logged in mit Token:', token)} />;
}

export default App;
