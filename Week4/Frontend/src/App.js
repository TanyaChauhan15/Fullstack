import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Upload from './Upload';
import Home from './Home';
import VideoPlayer from './VideoPlayer';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">YT Clone</Link>

          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/upload">Upload</Link>
            <Link className="btn btn-outline-light me-2" to="/dashboard">Dashboard</Link>
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-light" to="/register">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/watch/:id" element={<VideoPlayer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
