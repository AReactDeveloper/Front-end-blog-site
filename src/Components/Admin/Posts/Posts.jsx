import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import './Posts.scss'


const Posts = () => {

  const [pageTitle, setPageTitle] = useState('Posts');
  const [pageDescription, setPageDescription] = useState('Posts');

   // Access the current location
  let location = useLocation();

  console.log(location.pathname)

   useEffect(() => {
    const titleMap = {
      '/dashboard/posts': 'Post List',
      '/dashboard/posts/categories': 'Category List',
      '/dashboard/posts/tags': 'Tags List',
    };

    const descriptionMap = {
      '/dashboard/posts': 'Here you can view and modify you Post List',
      '/dashboard/posts/categories': 'Here you can view and modify you Category List',
      '/dashboard/posts/tags': 'Here you can view and modify you Tags List',
    };

    const title = titleMap[location.pathname] || 'Posts';
    const description = descriptionMap[location.pathname] || 'Posts List';
    setPageDescription(description)
    setPageTitle(title);
    
  }, [location]);

  // Get the current pathname
  const pathname = location.pathname;
  
  console.log(pathname)

  return (
    <div className='posts'>
        <div className="posts__header">
            <h1>{pageTitle}</h1>
            {pathname === '/dashboard/posts' && <Link className='outlineBtn' to='/dashboard/posts/add' ><FaPlus /> Add</Link>}
            {pathname === '/dashboard/posts/categories' && <Link className='outlineBtn' to='/dashboard/posts/categories/add' ><FaPlus /> Add</Link>}
            {pathname === '/dashboard/posts/tags' && <Link className='outlineBtn' to='/dashboard/posts/tags/add' ><FaPlus /> Add</Link>}

        </div>
          <p>{pageDescription}</p>

        <div className="posts__content">
            <Outlet />
        </div>
    </div>
  )
}

export default Posts;