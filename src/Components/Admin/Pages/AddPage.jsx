import React, { useEffect, useState } from 'react'
import MyEditor from '../../../Utils/Editor/MyEditor'; // Import custom editor component
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';


export default function AddPage() {

  const [editorOutput, setEditorOutput] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  useEffect(()=>{
      setInterval(() => {
          setError('')
          setMessage('')
      }, 3000);
  },[error,message])

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData()

    data.append('title', formData.title);
    data.append('content', editorOutput);

    axiosInstance.post('/api/pages', data)
    .then((response) => {
      console.log(response);
      setMessage("Page added successfully");
      navigate('/dashboard/pages');
    })
    .catch((error) => {
      console.log(error)
      setError("Something went wrong while adding the page");
    });
  }

  return (
    <form onSubmit={handleSubmit} className='form-group'>
      <div className="form-group">
        <label htmlFor="title">Page Title : </label>
        <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" name="title" />
      </div>
      <MyEditor setEditorOutput={setEditorOutput}  /> 
      <button>Submit Page</button>
    </form>
  )
}
