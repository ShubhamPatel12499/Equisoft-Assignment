import React, { useState } from 'react';
import { signup } from './firebase-config';
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert("user created")
      navigate("/login")
    } catch (error) {
      alert("user already exist");
      navigate("/login")
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup}>
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

export default Signup;
