import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { RiPagesLine } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
import './sidebar.scss';


export default function Sidebar() {
  return (
    <div className='adminSidebar'>
        <div className="adminSidebar__list">
            <ul>
                <Link to="/dashboard">
                    <li><AiFillDashboard />Dashboard</li>
                </Link>
                
                <li>
                    <Link to="posts"><FaNewspaper /> Posts</Link>
                </li>
                <li>
                    <Link to="media"><IoMdPhotos /> Media</Link>
                </li>
                <li>
                    <Link to="pages"><RiPagesLine /> Pages</Link>
                </li>
                <li>
                    <Link to="settings"><FaGear /> Settings</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
