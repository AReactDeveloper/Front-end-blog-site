import React, { useEffect, useState } from 'react';
import Select from 'react-select';  // Importing Select component for dropdowns
import CreatableSelect from 'react-select/creatable';  // Importing CreatableSelect component for tag creation
import { useParams, useNavigate, json } from 'react-router-dom';  // To access route parameters and navigate
import './Posts.scss';  // Importing styles
import MyEditor from '../../../Utils/Editor/MyEditor';  // Custom rich text editor
import axiosInstance from '../../../api/axiosInstance';  // Axios instance for API calls
import useArticle from '../../../Hooks/useArticle';  // Custom hook for fetching articles
import Spinner from '../../Admin/spinner/Spinner';  // Spinner component

export default function Edit() {
    const { id } = useParams();  // Extracting the article ID from the URL
    const navigate = useNavigate();  // Hook to navigate programmatically

    const { categories = [] , tags = []  } = useArticle();  // Fetching categories and tags using custom hook
    const [error, setError] = useState(null);  // State for handling errors
    const [imgUpload, setImgUpload] = useState(true);  // State for image upload toggle
    const [imageLoading, setImageLoading] = useState(false);  // State for handling image loading status
    const [tagsOptions, setTagsOptions] = useState([]);  // State to store tag options for the Select component
    const [categoryOptions, setCategoryOptions] = useState([{ value: 0, label: 'Select Category' }]);  // Initial state for category options
    const [postTags, setPostTags] = useState([]);  // State for selected tags
    const [postCategory, setPostCategory] = useState(null);  // State for selected category

    const [isLoading, setIsLoading] = useState(true);

    // State to manage form data
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        featuredImage: '',
        category: '',
        tags: [],
    });

    // Fetching the article data based on ID and populating formData
    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true)
            let post;
            await axiosInstance.get(`/api/articles/${id}`)
            .then(res => {
                post = res.data;
            }).catch(err => setError("fetching article failled try again"));
            // Populate formData with fetched post data
            setFormData({
                title: post.title || '',
                content: post.content === null ? '' : post.content,
                featuredImage: post.imgUrl || '',
                category: post.category_id || '',
                tags: post.tags || [],
            });
            setIsLoading(false)
            const selectedCategory = categories.find(cat => cat.id === post.category_id);
            setPostCategory(selectedCategory ? { value: selectedCategory.id, label: selectedCategory.title } : null);

            const selectedTags = tags.filter(tag => post.tags.some(postTag => postTag.id === tag.id))
                .map(tag => ({ value: tag.id, label: tag.title }));
                setPostTags(selectedTags);
            }
        fetchPost();
    }, [id, categories, tags]);

    // Fetch categories and tags options when data is loaded
    useEffect(() => {
        if (!isLoading) {
            const updatedCategories = categories.map(cat => ({
                value: cat.id,
                label: cat.title,
            }));
            setCategoryOptions([{ value: 0, label: 'Select Category' }, ...updatedCategories]);

            const updatedTags = tags.map(tag => ({
                value: tag.id,
                label: tag.title,
            }));
            setTagsOptions(updatedTags);
        }
    }, [categories, tags, isLoading]);

    // Handle changes in form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle changes in the editor content
    const handleEditorChange = (content) => {
        setFormData((prevData) => ({
            ...prevData,
            content,
        }));
    };

    // Handle category selection
    const handleCategoryChange = (selectedOption) => {
        setPostCategory(selectedOption);
        setFormData((prevData) => ({
            ...prevData,
            category: selectedOption.value,  // Store only the ID of the selected category
        }));
    };

    // Handle tag selection/creation
    const handleTagsChange = (selectedOptions) => {
        setPostTags(selectedOptions);
        setFormData((prevData) => ({
            ...prevData,
            tags: selectedOptions.map(option => option.value),  // Store only the IDs of the selected tags
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.title == '' || formData.content == ''){
            setError("we require title and content fields")
        }else{
            try {
            const formDataToSend = {
                ...formData,
                tags: postTags.map(tag => tag.value),
                category_id: postCategory ? postCategory.value : null,
            };
            await axiosInstance.put(`/api/articles/${id}`, formDataToSend);
            navigate('/dashboard/posts',{
                state: { message: 'Article was edited ....' },
            });  // Navigate to posts page after successful update
            } catch (err) {
                console.error(err);
                setError("Failed to update the article");
            }
        }
    };
    return (
    isLoading ? (
        <Spinner />
    ) : (
        <div className='AddPost'>
            
            <form className="form-group AddPost__form" onSubmit={handleSubmit}>
                <div className="mainPost">
                    {error && <p className="error">{error}</p>}
                    
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}  // Handling title input changes
                    />

                    <label htmlFor="content">Content:</label>
                    <MyEditor 
                            onChange={handleEditorChange} 
                            content={formData.content} 
                        />
                </div>

                <div className="sidePost">
                    <div className="sidePost__card">
                        <h3>Featured Image</h3>
                        <div className="sidePost__card__content">
                            {imgUpload ? (  // Conditional rendering based on image upload status
                                <>
                                    <img style={{ width: '100%', height: 'auto', padding: "10px" }} src={formData.featuredImage} alt="Featured" />
                                    <button type="button" onClick={() => setImgUpload(false)}>Remove</button>
                                </>
                            ) : (
                                <>
                                    {imageLoading ? (
                                        <p>Loading ...</p>
                                    ) : (
                                        <input
                                            type="file"
                                            name="featuredImage"
                                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.files[0] })}  // Handling image upload
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
                                options={categoryOptions}  // Providing category options
                                value={postCategory}  // Binding the category value
                                onChange={handleCategoryChange}  // Handling category selection change
                                placeholder="Select a category"
                            />
                        </div>
                    </div>

                    <div className="sidePost__card">
                        <h3>Tags</h3>
                        <div className="sidePost__card__content">
                            <CreatableSelect
                                isMulti
                                options={tagsOptions}  // Providing tag options
                                value={postTags}  // Binding the tags value
                                onChange={handleTagsChange}  // Handling tag selection/change
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
    )
);

}
