import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, goToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  axios.post('http://localhost:5000/login', { username, password })
    .then(res => {
      console.log("LOGIN RESPONSE:", res.data); // DEBUG

      // ✅ STORE TOKEN + ROLE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ UPDATE STATE
      onLogin(res.data.role);
    })
    .catch(err => {
      console.error(err);
      alert("Login failed");
    });
};

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={handleLogin}>
        Login
      </button>

      {/* SIGNUP BUTTON */}
      <p>
        Don't have an account?{' '}
        <button
          className="btn btn-link"
          onClick={goToSignup}
        >
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;