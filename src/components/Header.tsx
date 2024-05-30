import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you have a CSS file for styling the header

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 style={{ textAlign: 'center' }}>Crypto Tracker</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/trend">Trending</Link>
        <Link to="/charts">Charts</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
