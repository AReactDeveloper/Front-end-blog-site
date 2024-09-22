import React, { useEffect, useState } from 'react'
import UsePage from '../../../Hooks/UsePage.jsx'
import Table from '../Table/Table.jsx';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import axiosInstance from '../../../api/axiosInstance.js';

export default function PageList() {

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {pages,getPages} = UsePage();

  useEffect(()=>{
    getPages()
  },[])

  useEffect(()=>{
      setInterval(() => {
          setError(null)
          setMessage(null)
      }, 3000);
      if(!pages){
        setError('No Pages Found')
      }
  },[error,message])

  const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete this page ?") &&
      axiosInstance
      .delete(`/api/pages/${id}`)
      .then((response) => {
          getPages();
          setMessage('Page deleted')
      })
      .catch((error) => {
          setError('Page was not found');
      })
  }

  return (
    <div>
      {message && <div className='message-block'>{message}</div>}
      {error && <div className='error-block'>{error}</div>}
      <Table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Date of Publish</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {pages.length === 0 ? (
            <tr>
              <td colSpan="3">No Pages Found</td>
            </tr>
          ) : (
            pages.map(({ id, slug, title, created_at }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{new Date(created_at).toLocaleDateString()}</td>
                <td className='actions'>
                  <Link className='fill-green' to={`/dashboard/pages/view/${id}`}><IoEyeSharp /></Link>
                  <Link to={`/dashboard/pages/edit/${id}`} className='fill-blue'><MdEdit /></Link>
                  <a onClick={() => handleDelete(id)} className='fill-red'><FaTrash /></a>
                </td>
              </tr>
            ))
          )}
    </tbody>
      </Table>
    </div>
  )
}
