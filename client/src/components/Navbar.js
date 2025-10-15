import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  const isActiveLink = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Social Media</Link>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link 
              to="/posts" 
              className={`nav-link ${isActiveLink('/posts') ? 'active' : ''}`}
            >
              View Posts
            </Link>
            <Link 
              to="/create" 
              className={`nav-link ${isActiveLink('/create') ? 'active' : ''}`}
            >
              Create Post
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link 
            to="/login" 
            className={`nav-link ${isActiveLink('/login') ? 'active' : ''}`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
