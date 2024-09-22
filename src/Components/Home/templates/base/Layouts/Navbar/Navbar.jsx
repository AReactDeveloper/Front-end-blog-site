import React, { useEffect, useState } from 'react';
import { FiAlignLeft , FiAlignRight } from "react-icons/fi";
import {Link} from "react-router-dom"

import "./navbar.scss"
import useSiteInfo from '../../../../../../Hooks/useSiteInfo';
import Logo from '../../Logo/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {siteInfo} = useSiteInfo()

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="home_navbar">
      <div className="container">

        <Link to={"/"}>
          <Logo 
            title={siteInfo.siteName} 
            logo={siteInfo.siteLogo} 
            description={siteInfo.siteDescription}  
            logoOptions={siteInfo.siteLogoOptions} 
          />
        </Link>

        <div className={`nav_links ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
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
