import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/info.js'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/users');
      console.log(response.data);
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setInvalid(false);
        navigate('/landing'); // Redirect to landing page
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-500">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {invalid && (
          <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 text-center">
            Invalid username or password
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="sr-only">Username</label>
          <div className="flex items-center border border-blue-600 rounded-lg p-2">
            <i className="fas fa-user mr-2"></i>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="flex items-center border border-blue-600 rounded-lg p-2">
            <i className="fas fa-lock mr-2"></i>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
          </div>
          <a href="/" className="text-blue-600 text-sm hover:underline">Forgot Password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold py-2 rounded-lg hover:from-blue-500 hover:to-blue-900 transition"
        >
          Login
        </button>
        <a
          href="/signup"
          className="block text-center text-blue-600 text-sm mt-4 hover:underline"
        >
          New User? Sign up
        </a>
      </form>
    </div>
  );
};
