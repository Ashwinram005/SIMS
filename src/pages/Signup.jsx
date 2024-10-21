import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/info.js';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setInvalid(false);
      try {
        const response = await api.post('/users', {
          id: new Date().getTime(), // Simple unique ID generation
          username,
          password
        });
        console.log('User created:', response.data);
        navigate('/'); // Redirect to login page after signup
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-500">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {invalid && (
          <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 text-center">
            Passwords do not match
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <div className="flex items-center border border-blue-600 rounded-lg p-2">
            <i className="fas fa-lock mr-2"></i>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold py-2 rounded-lg hover:from-blue-500 hover:to-blue-900 transition"
        >
          Sign Up
        </button>
        <a
          href="/"
          className="block text-center text-blue-600 text-sm mt-4 hover:underline"
        >
          Back to Login
        </a>
      </form>
    </div>
  );
};
