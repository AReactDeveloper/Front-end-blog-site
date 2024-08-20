import React from 'react'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function List() {
  return (
    <div className='posts__list'>
        <div class="responsive-table">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Tags</th>
                    <th>Date of Publish</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Post 1</td>
                    <td>Tech</td>
                    <td>React, JavaScript</td>
                    <td>2024-08-01</td>
                    <td className='actions'>
                        <Link className='fill-green'><IoEyeSharp /></Link>
                        <Link className='fill-blue'><MdEdit /></Link>
                        <Link className='fill-red'><FaTrash /></Link>
                    </td>
                </tr>
                <tr>
                    <td>Post 2</td>
                    <td>Health</td>
                    <td>Wellness, Nutrition</td>
                    <td>2024-08-02</td>
                    <td className='actions'>
                        <Link className='fill-green'><IoEyeSharp /></Link>
                        <Link className='fill-blue'><MdEdit /></Link>
                        <Link className='fill-red'><FaTrash /></Link>
                    </td>
                </tr>
                <tr>
                    <td>Post 3</td>
                    <td>Travel</td>
                    <td>Adventure, Culture</td>
                    <td>2024-08-03</td>
                    <td className='actions'>
                        <Link className='fill-green'><IoEyeSharp /></Link>
                        <Link className='fill-blue'><MdEdit /></Link>
                        <Link className='fill-red'><FaTrash /></Link>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
  )
}
