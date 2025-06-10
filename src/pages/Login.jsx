import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://82.112.234.104:8001/api/auth/login/', {
        email,
        password,
      });

      // Save token (if any)
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Adjust path
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div className="container-fixed">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-primary mt-4">
        Login
      </button>
    </form>
    </div>
  );
}

export default Login;
