import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import './../Styles/base/_global.scss';
import './dashboard.scss';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';

export default function Dashboard() {
  return (
    <>
    <NavBar />
    <div className='dashboard'>
      <div className="grid-item">
        <Sidebar />
      </div>
      <div className="grid-item">
        <Outlet />
      </div>
    </div>
    </>
  )
}
