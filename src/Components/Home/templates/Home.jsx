import React, { useState } from 'react'
import Navbar from './Layouts/Navbar/Navbar'
import Sidebar from './Layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import './Styles/base.scss'
export default function Home() {


  return (
    <div className='homeWrapper'>
      <Navbar />
      <div className="homeWrapper__container">
          <div className="homeWrapper__main__area">
            <Outlet  />
          </div>
          <aside className='homeWrapper__main__sidebar'>
            <Sidebar />
          </aside>
      </div>
    </div>
  )
}
