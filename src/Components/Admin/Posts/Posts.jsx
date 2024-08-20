import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import './Posts.scss'

export default function Posts() {
  return (
    <div className='posts'>
        <div className="posts__header">
            <h1>Posts List</h1><Link className='outlineBtn'><FaPlus/> Add Post</Link>
        </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, nemo...</p>

        <div className="posts__content">
            <Outlet />
        </div>
    </div>
  )
}
