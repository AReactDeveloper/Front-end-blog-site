import React, { useEffect, useState } from 'react';
import MyEditor from '../../../Utils/Editor/MyEditor'; // Import custom editor component
import './Posts.scss'; // Import styles for the component
import Select from 'react-select'; // Import Select component for categories
import CreatableSelect from 'react-select/creatable'; // Import CreatableSelect component for tags
import useArticle from './../../../Hooks/useArticle'; // Import custom hook for fetching categories and tags
import axiosInstance from '../../../api/axiosInstance'; // Import axios instance for API requests
import {useNavigate} from 'react-router-dom'

export default function Add() {

  const navigate = useNavigate();

  //setImageName state
  const [imageId, setImageId] = useState('');

  // Destructure categories, loading state, and tags from the custom hook
  const { categories, isLoading, tags } = useArticle();
  
  // State to manage tags options and selected tags
  const [tagsOptions, setTagsOptions] = useState([]);
  
  // State to manage editor output
  const [editorOutput, setEditorOutput] = useState('');
  
  // State to manage form errors
  const [error, setError] = useState(null);

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
    content: editorOutput, // Initially empty, will be updated with editorOutput
    category: null,
    tags: [], // Initialize as an empty array
    featuredImage: null
  });

  // Effect to update category options and tags options when categories or tags data changes
  useEffect(() => {
    if (!isLoading && categories) {
      // Map categories to format required by Select component
      const updatedCategories = categories.map(cat => ({
        value: cat.id,
        label: cat.title
      }));
      // Set category options, including a default option
      setCategoryOptions([{ value: 0, label: 'Select Category' }, ...updatedCategories]);
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
  }, [categories, isLoading, tags,formData]);

  // Effect to update formData content when editorOutput changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      content: editorOutput
    }));
  }, [editorOutput]);

  // Handle category selection change
  const handleCategoryChange = (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      category: selectedOption
    }));
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
        featuredImage: `http://localhost:9000${response.data.url}`
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
    setImgUpload(false);
    
    console.log(formData.featuredImage)
    //make a post delete request to the server
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
  if(formData.category){
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
 

  return (
    <div className='AddPost'>
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
                  <button onClick={handleImageRemove}>remove</button>
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
