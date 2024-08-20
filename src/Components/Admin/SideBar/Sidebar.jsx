import React, { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaNewspaper } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoMdPhotos } from 'react-icons/io';
import { RiPagesLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './sidebar.scss';

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
            { name: 'Add Category', route: '/dashboard/posts/categories/add' },
            { name: 'View Tags', route: '/dashboard/posts/tags' },
            { name: 'Add Tag', route: '/dashboard/posts/tags/add' },
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
            { name: 'All Pages', route: '/pages' },
            { name: 'Add new Page', route: '/pages/add' },
        ]
    },
    {
        icon: <FaGear />,
        title: 'Settings',
        sublist: [
            { name: 'General settings', route: '/settings/general' },
            { name: 'Account settings', route: '/settings/account' },
        ]
    },
];

const AdminSidebar = () => {
    // State to keep track of which sidebar items are active
    const [activeItem, setActiveItem] = useState({});

    // Function to handle item clicks and toggle active state
    const handleClick = (index) => {
        setActiveItem(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle the active state of the clicked item
        }));
    }

    return (
        <div className='adminSidebar'>
            <div className="adminSidebar__list">
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
                                className={`adminSidebar__item__sublist ${activeItem[index] ? 'active' : ''}`}
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
    );
}

export default AdminSidebar;
