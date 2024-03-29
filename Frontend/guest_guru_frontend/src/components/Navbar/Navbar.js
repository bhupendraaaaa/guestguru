import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImage from '../Assets/logonavbar.png';

function Navbar() {
  const location = useLocation();

  // Check if the current route is not login or register
  const shouldDisplayNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    shouldDisplayNavbar && (
      <nav className="navbar">
        <div className="logo-nav">
          <Link to="/">
            <img src={logoImage} alt="Logo"/>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/room">Rooms & Suits</Link>
          </li>
          <li>
            <Link to="/services">Facilities</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Navbar;
