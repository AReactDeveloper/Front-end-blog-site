import React, { useEffect, useState } from 'react';
import MyEditor from '../../../Utils/Editor/MyEditor'; // Import custom editor component
import './Posts.scss'; // Import styles for the component
import Select from 'react-select'; // Import Select component for categories
import CreatableSelect from 'react-select/creatable'; // Import CreatableSelect component for tags
import useArticle from './../../../Hooks/useArticle'; // Import custom hook for fetching categories and tags
import axiosInstance from '../../../api/axiosInstance'; // Import axios instance for API requests
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  // Initialize state
  const [currentCat,SetCurrentCat] = useState();
  const [imageId, setImageId] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imgUpload, setImgUpload] = useState(true);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([{ value: 0, label: 'Select Category' }]);
  const [editorOutput, setEditorOutput] = useState('');
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: null,
    tags: [],
    featuredImage: null
  });

  const { categories, isLoading, tags } = useArticle();

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/api/articles/${id}`);
        const post = response.data;
        console.log(post)

        setFormData({
            title: post.title || '',
            content: post.content || '',
            category: post.category_id ? { value: post.category_id, label: post.category?.title } : null,
            tags: post.tags ? post.tags.map(tag => ({ value: tag.id, label: tag.title })) : [],
            featuredImage: post.imgUrl || null
        });
        setImageId(post.imageId || '');
        setEditorOutput(post.content || ''); // Update editor with existing content
        setImgUpload(!!post.imgUrl);
      } catch (error) {
        console.log('Error fetching post data:', error.response.data);
      }
    };

    fetchPostData();
  }, [id]);

    // Update category and tags options
    useEffect(() => {

        //set current tag
        

        if (!isLoading && categories) {
            const updatedCategories = categories.map(cat => ({
            value: cat.id,
            label: cat.title
            }));
            setCategoryOptions(updatedCategories); // Update the category options
            updatedCategories.map(cat=>{
            if(cat == formData.category_id){
                console.log(cat)
                SetCurrentCat({value: cat.id, label: cat.title});
            }
        })
        }

        if (!isLoading && tags) {
            const updatedTags = tags.map(tag => ({
            value: tag.id,
            label: tag.title
            }));
            setTagsOptions(updatedTags); // Update the tags options
        }
    }, [categories, isLoading, tags]);


  // Handle category change
  const handleCategoryChange = (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      category: selectedOption
    }));
  };

  // Handle tags change
  const handleTagsChange = (newValue) => {
    setFormData(prevData => ({
      ...prevData,
      tags: newValue
    }));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log(`Input Change - ${name}: ${value}`); // Debugging log
  };

  // Handle file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageLoading(true);
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
        setImageId(response.data.id);
        setImgUpload(true);
      } catch (error) {
        console.log('Error uploading file:', error.response.data);
      } finally {
        setImageLoading(false);
      }
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImgUpload(false);
    axiosInstance.delete(`/api/file/${imageId}`)
      .then(() => {
        setFormData(prevData => ({
          ...prevData,
          featuredImage: null
        }));
      })
      .catch(error => {
        console.log('Error removing image:', error.response.data);
      });
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.category) {
      data.append('category_id', formData.category.value);
    }
    if (formData.featuredImage) {
      data.append('imgUrl', formData.featuredImage);
    }
    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag.label);
    });

    try {
      await axiosInstance.put(`/api/articles/${id}`, data); // Use PUT for updating
      navigate('/dashboard/posts');
    } catch (error) {
      console.log('Error updating article:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className='AddPost'>
      <form onSubmit={handleSave} className="form-group AddPost__form">
        <div className="mainPost">
          {error && <p className="error">{error}</p>}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="content">Content:</label>
          <MyEditor setEditorOutput={setEditorOutput} content={editorOutput} />
        </div>

        <div className="sidePost">
          <div className="sidePost__card">
            <h3>Featured Image</h3>
            <div className="sidePost__card__content">
              {imgUpload ? (
                <>
                  <img style={{ width: '150px', height: 'auto' }} src={formData.featuredImage} alt="Featured" />
                  <button onClick={handleImageRemove}>Remove</button>
                </>
              ) : (
                <>
                  {imageLoading ? <p>Loading ...</p> : (
                    <input
                      type="file"
                      name="featuredImage"
                      onChange={handleFileChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div className="sidePost__card">
            <h3>Categories</h3>
            <div className="sidePost__card__content">
              <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={currentCat}
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
                components={{ DropdownIndicator: null }}
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
        <button type='submit'>Update Article</button>
      </form>
    </div>
  );
}
