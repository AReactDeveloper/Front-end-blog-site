import React, { useEffect, useState } from 'react';
import MyEditor from '../../../Utils/Editor/MyEditor'; // Import custom editor component
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editorOutput, setEditorOutput] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [initialContent, setInitialContent] = useState('');

  useEffect(() => {
    const fetchPageData = async () => {
        try{
          const res = await axiosInstance.get('/api/pages/'+id);
          if(res.data){
            const {title, content} = res.data;
            setInitialContent(content)
            setFormData({
              title,content
            });
            setIsLoading(false)
          }
        }
        catch(err){
          console.log(err)
        }
    };

    fetchPageData();
  }, [id]);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: editorOutput
    };

    try {
      await axiosInstance.put(`/api/pages/${id}`, data);
      setMessage('Page updated successfully');
      navigate('/dashboard/pages');
    } catch (error) {
      setError('Something went wrong, please try again.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  if(isLoading){
    return 'Loading...'
  }else{
    return (
    <div className='EditPage'>
      <form className="form-group" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <MyEditor
            setEditorOutput={setEditorOutput}
            content={initialContent}
          />
        </div>

        <button type="submit">Update Page</button>
      </form>
    </div>
  );
  }
}
