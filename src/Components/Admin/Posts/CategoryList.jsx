import React, { useEffect, useRef, useState } from 'react';
import useArticle from '../../../Hooks/useArticle';
import Table from '../Table/Table';
import Modal from '../Modal/Modal';
import axiosInstance from '../../../api/axiosInstance';

export default function CategoryList() {
  const { categories , getCategories } = useArticle();
  const [categoryTitle, setCategoryTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef();


  useEffect(()=>{
    getCategories();
  },[categories])

  const handleCategoryAdd = async (e) => {
    e.preventDefault();

    if (!categoryTitle.trim()) {
      setError('Please enter a category title');
      return;
    }

    try {
      const form = new FormData();
      form.append('title', categoryTitle);

      const res = await axiosInstance.post('/api/categories', form);
      console.log(res);
      getCategories();
      setMessage('Category added successfully');
      setError('');
      setCategoryTitle(''); // Clear input on success
      modalRef.current?.toggleModal(); // Close modal on success
    } catch (err) {
      console.log(err);
      setError('Something went wrong while adding the category');
      setMessage('');
    }
  };

  const handleOpenModal = () => {
    setCategoryTitle('');
    setError(''); // Clear any errors when opening modal
    modalRef.current.toggleModal();
  };

  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tag ?")) {
            return;
        }

        try {
            //request delete from server
            const res = await axiosInstance.delete(`/api/categories/${id}`);
            console.log(res)
            getCategories();
            setMessage('category deleted');
        } catch (error) {
            setError('Something went wrong while deleting the category');
            console.log(error);
        }
    }


  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
        <button onClick={handleOpenModal}>Add New</button>
        <Modal ref={modalRef}>
          {error && <p style={{ color: 'red' }}>{error}</p>}          
          <form className="addCategory" onSubmit={handleCategoryAdd}>
            <input 
              name="name" 
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)} 
              placeholder="Category name" 
            />
            <div className="addCategory__actions">
              <button type="submit" className="btn btn--add">Add</button>
              <button type="button" onClick={handleOpenModal} className="btn btn--remove">Cancel</button>
            </div>
          </form>
        </Modal>
      <div className="responsive-table">
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Post Count</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>{category.articles_count}</td>
                <td><button onClick={() => handleDelete(category.id)}>x</button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
