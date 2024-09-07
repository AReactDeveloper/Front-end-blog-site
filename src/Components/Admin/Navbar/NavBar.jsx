import React from 'react'
import { FaHome , FaPlus  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './navbar.scss';

export default function NavBar() {
  return (
    <nav className='navbar'>
        <Link to={"/"} target='_blank'>
            <FaHome /> Visit site
        </Link>
        <Link>
            <FaPlus /> Add New Post
        </Link>
    </nav>
  )
}
