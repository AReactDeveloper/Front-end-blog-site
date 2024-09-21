import React, { useEffect, useRef, useState } from 'react'
import useArticle from '../../../Hooks/useArticle';
import Table from '../Table/Table';
import Modal from '../Modal/Modal';
import axiosInstance from '../../../api/axiosInstance';

export default function TagList() {
  
     const {tags , getTags} = useArticle();
     const modalRef = useRef();
     const [tagTitle, setTagTitle] = useState('');
     const [error, setError] = useState('');
     const [message, setMessage] = useState('');

     useEffect(()=>{
        getTags();
    },[])
     const handleOpenModal = () => {
        setTagTitle('');
        setError(''); // Clear any errors when opening modal
        modalRef.current.toggleModal();
    };

    const handleTagAdd = async (e) =>{
        e.preventDefault();

    if (!tagTitle.trim()) {
      setError('Please enter a category title');
      return;
    }

    try {
        const form = new FormData();
        form.append('title', tagTitle);

        const res = await axiosInstance.post('/api/tags', form);
        console.log(res);
        getTags();
        setMessage('Category added successfully');
        setError('');
        setTagTitle(''); // Clear input on success
    } catch (err) {
        console.log(err);
        setError('Something went wrong while adding the category');
        setMessage('');
    }
    modalRef.current?.toggleModal(); // Close modal on success

    }


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tag ?")) {
            return;
        }

        try {
            //request delete from server
            const res = await axiosInstance.delete(`/api/tags/${id}`);
            if (res.status === 200) {
                getTags();
                setMessage('Tag deleted');
            } else {
                setError('Tag was not found');
            }
        } catch (error) {
            setError('Something went wrong while deleting the tag');
            console.log(error);
        }
    }


  return (
    <div className="responsive-table">
        <button onClick={handleOpenModal}>Add New</button>
        <Modal ref={modalRef}>
          {error && <p style={{ color: 'red' }}>{error}</p>}          
          <form className="addCategory" onSubmit={handleTagAdd}>
            <input 
              name="name" 
              value={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)} 
              placeholder="Category name" 
            />
            <div className="addCategory__actions">
              <button type="submit" className="btn btn--add">Add</button>
              <button type="button" onClick={handleOpenModal} className="btn btn--remove">Cancel</button>
            </div>
          </form>
        </Modal>
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Post Count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {tags.length === 0 ? (
              <tr>
                <td colSpan="3">No Tags Found</td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.title}</td>
                  <td>{tag.articles_count}</td>
                  <td>
                    <button onClick={() => handleDelete(tag.id)}>x</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
    </div>
  )
}
