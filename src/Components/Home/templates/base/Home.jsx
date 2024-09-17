import React, { useState } from 'react'
import Navbar from './Layouts/Navbar/Navbar'
import Sidebar from './Layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import './Styles/base.scss'
import { Helmet } from 'react-helmet';
import useSiteInfo from '../../../../Hooks/useSiteInfo';
import SiteInfo from '../../../Admin/Settings/SiteInfo';


export default function Home() {

  const {siteInfo} = useSiteInfo()

  return (
    <>
    <Helmet>
      <title>{siteInfo?.siteName  + ' | ' + siteInfo?.siteDescription}</title>
      <meta name="description" content={siteInfo?.siteDescription} />
      <link rel="icon" href={siteInfo?.siteFavicon} type="image/png" />
      <meta name="keywords" content="Home" />
      <meta name="author" content="Home" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://www.google.com/" />
      <link rel="apple-touch-icon" href="https://www.google.com/s2/favicons?domain=https://www.google.com/" />
    </Helmet>
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
    </>
  )
}
