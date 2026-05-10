import React, { useState } from 'react';
import axios from 'axios';

function Signup({ goToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');

  const handleSignup = () => {
    axios.post('http://localhost:5000/signup', {
      username,
      password,
      role
    })
    .then(() => {
      alert("Signup successful");
      goToLogin();
    })
    .catch(() => alert("Signup failed"));
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>

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

      <select
        className="form-control mb-2"
        onChange={e => setRole(e.target.value)}
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-success" onClick={handleSignup}>
        Signup
      </button>

      <br /><br />
      <button className="btn btn-link" onClick={goToLogin}>
        Already have account? Login
      </button>
    </div>
  );
}

export default Signup;