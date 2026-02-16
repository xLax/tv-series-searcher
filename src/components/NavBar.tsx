import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        Home
      </Link>
      <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>
        Favorites
      </Link>
    </nav>
  );
};

export default NavBar;