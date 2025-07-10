import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', formData);
      const { token, user } = res.data;
      localStorage.setItem('token', token); // save token
      localStorage.setItem('user', JSON.stringify(user)); // optional: save user info
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.non_field_errors || err.message));
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-success" type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
