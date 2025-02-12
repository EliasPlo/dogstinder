import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/maps">Kartat</Link></li>
        <li><Link to="/events">Tapahtumat</Link></li>
        <li><Link to="/profile">Profiili</Link></li>
        <li><Link to="/settings">Asetukset</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
