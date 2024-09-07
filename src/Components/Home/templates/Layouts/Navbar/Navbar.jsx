import React, { useState } from 'react';
import { FiAlignLeft , FiAlignRight } from "react-icons/fi";

import "./navbar.scss"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="home_navbar">
      <div className="container">
        <div className="logo">Blog title</div>
        <div className={`nav_links ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleNavbar}>
          {isOpen ? <FiAlignLeft size={30} /> : <FiAlignRight size={30}/> }
        </div>
      </div>
    </nav>
  );
}
