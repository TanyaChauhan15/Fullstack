import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', formData);
      setMessage('Registered successfully! Token: ' + res.data.token);
    } catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
