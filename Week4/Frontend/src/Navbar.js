// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">YT Clone</Link>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/upload">Upload</Link>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
