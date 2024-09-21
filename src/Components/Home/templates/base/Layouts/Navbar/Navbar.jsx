import React, { useEffect, useState } from 'react';
import { FiAlignLeft , FiAlignRight } from "react-icons/fi";
import {Link} from "react-router-dom"

import "./navbar.scss"
import useSiteInfo from '../../../../../../Hooks/useSiteInfo';
import Logo from '../../Logo/Logo';
import UsePage from '../../../../../../Hooks/UsePage';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {siteInfo} = useSiteInfo()
  const {pages} = UsePage()

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
            {pages.map(page =>{
                return <li id={page.id}><Link to={'/page/' + page.slug}>{page.title}</Link></li>
            })}
          </ul>
        </div>
        <div className="hamburger" onClick={toggleNavbar}>
          {isOpen ? <FiAlignLeft size={30} /> : <FiAlignRight size={30}/> }
        </div>
      </div>
    </nav>
  );
}
