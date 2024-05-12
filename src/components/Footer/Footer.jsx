// Footer.js

import React from "react";
import "./Footer.css"; // Import CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Copyright © 2024 Your Company</p>
        <ul className="footer-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
