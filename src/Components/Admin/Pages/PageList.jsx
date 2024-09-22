import React, { useEffect } from 'react'
import UsePage from '../../../Hooks/UsePage.jsx'
import Table from '../Table/Table.jsx';
import { Link, useLocation } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function PageList() {

  const {pages} = UsePage();

  useEffect(()=>{
    console.log(pages)
  },[])

  return (
    <div>
      <Table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Date of Publish</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {pages.map(({ id, slug, title, created_at}) => (
            <tr key={id}>
                <td>{title}</td>
                <td>{new Date(created_at).toLocaleDateString()}</td>
                <td className='actions'>
                    <Link className='fill-green'><IoEyeSharp /></Link>
                    <Link to={`/dashboard/posts/edit/${slug}`} className='fill-blue'><MdEdit /></Link>
                    <a className='fill-red'><FaTrash /></a>
                </td>
            </tr>
        ))}
    </tbody>
      </Table>
    </div>
  )
}
