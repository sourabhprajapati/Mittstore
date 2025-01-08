import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Mittshop</h3>
          <p>Your one-stop shop for all educational needs.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mittshop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
