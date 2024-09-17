import React, { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaNewspaper } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoMdPhotos } from 'react-icons/io';
import { RiPagesLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './sidebar.scss';
import useAuth from '../../../Hooks/useAuth';

// Sidebar data with icons, titles, and sublists
const adminSidebarData = [
    
    {
        icon: <AiFillDashboard />,
        title: 'Dashboard',
        sublist: [] //all ik is i gotta keep this here or code wont work haha
    },
    {
        icon: <FaNewspaper />,
        title: 'Posts',
        sublist: [
            { name: 'View posts', route: '/dashboard/posts' },
            { name: 'Add Post', route: '/dashboard/posts/add' },
            { name: 'View Categories', route: '/dashboard/posts/categories' },
            { name: 'View Tags', route: '/dashboard/posts/tags' },
        ]
    },
    {
        icon: <IoMdPhotos />,
        title: 'Media',
        sublist: [
            { name: 'All Media', route: '/media' },
            { name: 'Upload Media', route: '/media/upload' },
        ]
    },
    {
        icon: <RiPagesLine />,
        title: 'Pages',
        sublist: [
            { name: 'All Pages', route: '/dashboard/pages' },
            { name: 'Add new Page', route: '/dashboard/pages/add' },
        ]
    },
    {
        icon: <FaGear />,
        title: 'Settings',
        sublist: [
            { name: 'General settings', route: '/dashboard/settings' },
            { name: 'Account settings', route: '/dashboard/settings/account' },
        ]
    },
];

const AdminSidebar = () => {
    const { logout } = useAuth();
    // State to keep track of which sidebar items are active
    const [activeItem, setActiveItem] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    
    
   

    // Function to handle item clicks and toggle active state
    const handleClick = (index) => {
        setActiveItem(index);
    }

    return (
        <>
        <div className='adminSidebar'>
            <div className="adminSidebar__list">
                <div className='adminSidebar__logo'>
                    <AiFillDashboard className='adminSidebar__logo__icon' size={100} />
                    <button onClick={()=>logout()}>Logout</button>
                </div>
                <ul>
                    {adminSidebarData.map((item, index) => (
                        <li
                            onClick={() => handleClick(index)} // Toggle active state on click
                            className="adminSidebar__item"
                            key={index}
                        >
                            {/* Sidebar item with icon and title */}
                            <span>{item.icon}{item.title}</span>
                            {/* Sublist that is conditionally displayed based on active state */}
                            <ul
                                className={`adminSidebar__item__sublist ${index === activeItem ? 'active' : '' }`}
                            >
                                {item.sublist.map((subitem, subIndex) => (
                                    <li
                                        className="adminSidebar__item__sublist__subitem"
                                        key={subIndex}
                                    >
                                        {/* Link to subitem route */}
                                        <Link to={subitem.route}>{subitem.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default AdminSidebar;
