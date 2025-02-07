import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = () => {
  const [isMapsOpen, setIsMapsOpen] = useState(false);
  const [isMapsOpen2, setIsMapsOpen2] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li 
          className="dropdown" 
          onMouseEnter={() => setIsMapsOpen(true)} 
          onMouseLeave={() => setIsMapsOpen(false)}
        >
          <span className="dropdown-title">Maps ▾</span>
          {isMapsOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/map/parks">Park Map</Link></li>
              <li><Link to="/map/vets">Vet Map</Link></li>
              <li><Link to="/map/events">Event Map</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/events">Events</Link></li>

        <li 
          className="dropdown" 
          onMouseEnter={() => setIsMapsOpen2(true)} 
          onMouseLeave={() => setIsMapsOpen2(false)}
        >
          <span className="dropdown-title">Profile ▾</span>
          {isMapsOpen2 && (
            <ul className="dropdown-menu">
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
