import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import './../Styles/base/_global.scss';
import './dashboard.scss';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import NavBar from '../Navbar/NavBar';

export default function Dashboard() {
  
  const [pageTitle, setPageTitle] = useState('Posts');
  const [pageDescription, setPageDescription] = useState('Posts');

   // Access the current location
  let location = useLocation();

  console.log(location.pathname)

   useEffect(() => {
    const titleMap = {
      '/dashboard/posts': 'Post List',
      '/dashboard/posts/add': 'Add Post',
      '/dashboard/posts/edit/:id': 'Edit Post',
      '/dashboard/posts/categories': 'Category List',
      '/dashboard/posts/tags': 'Tags List',
      '/dashboard/pages': 'Pages List',
      '/dashboard/pages/edit': 'Edit Page',
      '/dashboard/pages/add': 'Add Page',
      '/dashboard/settings': 'General Site Settings',
      '/dashboard/settings/account': 'Account Settings',
    };

    const descriptionMap = {
      '/dashboard/posts': 'Here you can view and modify you Post List',
      '/dashboard/posts/add': 'Add a new Post here',
      '/dashboard/posts/edit': 'Edit Post',
      '/dashboard/pages': 'Here you can view and manage pages list',
      '/dashboard/pages/add': 'Add a new page here',
      '/dashboard/pages/edit': 'Edit page here',
      '/dashboard/posts/categories': 'Here you can view and modify you Category List',
      '/dashboard/posts/tags': 'Here you can view and modify you Tags List',
      '/dashboard/settings': 'Here you can modify your General Site Settings',
      '/dashboard/settings/account': 'Here you can modify Admin Account Settings',
    };

    const title = titleMap[location.pathname] || '';
    const description = descriptionMap[location.pathname] || '';
    setPageDescription(description)
    setPageTitle(title);
  }, [location]);

  // Get the current pathname
  const pathname = location.pathname;
  
  return (
    <>
    <NavBar />
    <div className='dashboard'>
      <div className="grid-item">
        <Sidebar />
      </div>
      <div className="grid-item">
          <div className="dashboard__header">
              <div className="dashboard__title">
                    <h1>{pageTitle}</h1>
                    {pathname === '/dashboard/posts' && <Link className='outlineBtn' to='/dashboard/posts/add' ><FaPlus /> Add</Link>}
                    {pathname === '/dashboard/pages' && <Link className='outlineBtn' to='/dashboard/pages/add' ><FaPlus /> Add</Link>}
              </div>
            <p>{pageDescription}</p>
          </div>
        <Outlet />
      </div>
    </div>
    </>
  )
}
