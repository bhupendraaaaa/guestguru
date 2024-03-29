import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

  // Check if the current route is not login or register
  const shouldDisplayNavbar = !['/login', '/register'].includes(location.pathname);
  return (
    shouldDisplayNavbar && (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer">
            <h3>Guest Guru</h3>
            <p>Guest Guru is a hotel booking website that offers a variety of rooms and suits to choose from. We provide the best services and facilities to our customers. We are committed to providing the best experience to our customers.</p>
          </div>
          <div className="footer">
            <h3>Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>Rooms & Suits</li>
              <li>Services</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer">
            <h3>Contact Us</h3>
            <ul>
              <li>Guest Guru</li>
              <li>Baneshwor, Kathmandu, Nepal</li>
              <li>City, State, Country</li>
                <li>Phone: 1234567890</li>
                <li>Email:guestguru@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
    );


}

export default Footer;
