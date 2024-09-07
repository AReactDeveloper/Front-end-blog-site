import React, { useEffect, useRef, useState } from 'react';
import MyEditor from '../../../Utils/Editor/MyEditor'; // Import custom editor component
import './Posts.scss'; // Import styles for the component
import Select from 'react-select'; // Import Select component for categories
import CreatableSelect from 'react-select/creatable'; // Import CreatableSelect component for tags
import useArticle from './../../../Hooks/useArticle'; // Import custom hook for fetching categories and tags
import axiosInstance from '../../../api/axiosInstance'; // Import axios instance for API requests
import {useNavigate} from 'react-router-dom'
import Modal from '../Modal/Modal';

export default function Add() {

  const navigate = useNavigate();

  //setImageName state
  const [imageId, setImageId] = useState('');

  // Destructure categories, loading state, and tags from the custom hook
  const { categories , getCategories , isLoading, tags } = useArticle();
  
  // State to manage tags options and selected tags
  const [tagsOptions, setTagsOptions] = useState([]);
  
  // State to manage editor output
  const [editorOutput, setEditorOutput] = useState('');
  
  // State to manage form errors
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // state to hold image upload element
  const [imgUpload, setImgUpload] = useState(false);
  
  // State to manage category options for the Select component
  const [categoryOptions, setCategoryOptions] = useState([
    { value: 0, label: 'Select Category' }
  ]);

  //state to manage image loading 
  const [imageLoading, setImageLoading] = useState(false);
  
  // State to manage form data including title, content, category, tags, and featured image
  const [formData, setFormData] = useState({
    title: '',
    content: '', // Initially empty, will be updated with editorOutput
    category: null,
    tags: [], // Initialize as an empty array
    featuredImage: null
  });

  const modalRef = useRef();
  const [categoryTitle, setCategoryTitle] = useState('');


  // Effect to update category options and tags options when categories or tags data changes
  useEffect(() => {
    if (!isLoading && categories) {
      // Map categories to format required by Select component
      const updatedCategories = categories.map(cat => ({
        value: cat.id,
        label: cat.title
      }));
      // Set category options, including a default option
      setCategoryOptions([...updatedCategories]);
    }

    if (!isLoading && tags) {
      // Map tags to format required by CreatableSelect component
      const updatedTags = tags.map(tag => ({
        value: tag.id,
        label: tag.title
      }));
      // Set tags options
      setTagsOptions([...updatedTags]);
    }
  }, [categories, isLoading, tags,formData, setFormData]);

  // Effect to update formData content when editorOutput changes
  useEffect(() => {
    console.log(editorOutput)
    setFormData(prevData => ({
      ...prevData,
      content: editorOutput
    }));
  }, [editorOutput]);

  // Handle category selection change
  const handleCategoryChange = (selectedOption) => {
    if(selectedOption.value == 0){
      setFormData(prevData => ({
        ...prevData,
        category: null
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        category: selectedOption
      }));
    }
  };

  // Handle change event for tags, updating formData and tagsOptions
  const handleTagsChange = (newValue) => {
    setFormData(prevData => ({
      ...prevData,
      tags: newValue
    }));
    setTagsOptions(newValue);
  };

  // Handle input change for title field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file change for featured image
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  
  if (file) {
    setImageLoading(true)
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axiosInstance.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData(prevData => ({
        ...prevData,
        featuredImage: `http://localhost:9000/${response.data.url}`
      }));
      setImageId(response.data.id)
    
    } catch (error) {
      
      console.log(error.response.data)
    } finally {
      setImageLoading(false);
      setImgUpload(true)
    }
  } else {
    setImageLoading(false);
  }
};


  // handle image remove click
  const handleImageRemove = () => {
    console.log('hello')
    setImgUpload(false);
    console.log(formData.featuredImage)
    //make a post delete request to the server
    console.log('delete')
    axiosInstance
      .delete(`/api/file/${imageId}`)
      .then((response) => {

        console.log(response.data);
        setFormData(prevData => ({
          ...prevData,
          featuredImage: null
        }));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };


  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Create a FormData object for submission
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', editorOutput); // Ensure content is a string
    if(formData.category != null){
      data.append('category_id',formData.category.value);
    }
    if(formData.featuredImage) {
      data.append('imgUrl', formData.featuredImage);
    }
    
    // Handle tags: Append each tag as a separate field
    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag.label);
    });

    if(formData.title == '' || formData.content == ''){
      setError("we require title and content fields")
    }else{
      try {
        const response = await axiosInstance.post('/api/articles', data);
        console.log('Response:', response);
        navigate('/dashboard/posts');
      } catch (error) {
      //console.log(error)
        console.log(error.response.data.error)
        setError(error.response.data.error);
      }
    };

  }
  // Submit the form data using axios

  const handleOpenModal = () => {
    setCategoryTitle('');
    setError(''); // Clear any errors when opening modal
    modalRef.current.toggleModal();
  };

  const handleCategoryAdd = async (e) => {
    e.preventDefault();

    if (!categoryTitle.trim()) {
      return;
    }

    try {
      const form = new FormData();
      form.append('title', categoryTitle);
      const res = await axiosInstance.post('/api/categories', form);
      console.log(res);
      setCategoryTitle(''); // Clear input on success
      setMessage('Category added successfully');
      getCategories()
      modalRef.current?.toggleModal(); // Close modal on success
    } catch (err) {
      console.log(err);
      setError('Something went wrong while adding the category');
    }
  };

 

  return (
    <div className='AddPost'>
      <Modal ref={modalRef}>
          {error && <p style={{ color: 'red' }}>{error}</p>}          
          {message && <p style={{ color: 'green' }}>{message}</p>}          
          <form className="addCategory" onSubmit={handleCategoryAdd}>
            <input 
              autoFocus={true}
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
      <form onSubmit={handleSave} className="form-group AddPost__form">
        <div className="mainPost">
        {error && <p className="error">{error}</p>} {/* Display error message if any */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label htmlFor="content">Content:</label>
        <MyEditor setEditorOutput={setEditorOutput}  /> {/* Custom editor component */}
        </div>
        <div className="sidePost">
          <div className="sidePost__card">
            <h3>Featured Image</h3>
            <div className="sidePost__card__content">
              {imgUpload ? 
                <>
                  <img style={{width:'150px',height:'auto'}} src={formData.featuredImage} /> 
                  <button className='btn btn--primary' type="button" onClick={handleImageRemove}>Remove</button>
                </>
              : <>
                {imageLoading ? <p>Loading ...</p> : <>
                <input
                  type="file"
                  name="featuredImage"
                  onChange={handleFileChange}
                />
                
                </>}
              </>}
              
              
            </div>
          </div>

          <div className="sidePost__card">
            <h3>Categories</h3>
            <div className="sidePost__card__content">
              <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={formData.category}
                placeholder="Select a category"
              />
              <a 
              style={
                {color:'blue',textDecoration:'underline' ,cursor:'pointer'}
              }
              onClick={handleOpenModal}
              >Create a new category</a>
            </div>
          </div>

          <div className="sidePost__card">
            <h3>Tags</h3>
            <div className="sidePost__card__content">
              <CreatableSelect
                isMulti
                options={tagsOptions}
                value={formData.tags}
                onChange={handleTagsChange}
                placeholder="Type and press enter to add..."
                components={{ DropdownIndicator: null }} // Remove dropdown arrow
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: '40px',
                  }),
                }}
              />
            </div>
          </div>
        </div>
        <button type='submit'>Post Article</button>
      </form>
    </div>
  );
}
