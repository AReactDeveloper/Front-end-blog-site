import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import './../Styles/base.scss';
import './dashboard.scss';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="grid-item">
        <Sidebar />
      </div>
      <div className="grid-item">
        <Outlet />
      </div>
    </div>
  )
}
