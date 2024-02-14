import React, { useState } from 'react';
import { login } from './firebase-config';
import "../Styles/login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login Succesful")
      localStorage.setItem('isLoggedIn', true);
      navigate("/");
    } catch (error) {
      alert("User not Exist")
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
