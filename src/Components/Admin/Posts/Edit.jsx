import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useParams, useNavigate } from 'react-router-dom';
import './Posts.scss';
import MyEditor from '../../../Utils/Editor/MyEditor';
import axiosInstance from '../../../api/axiosInstance';
import useArticle from '../../../Hooks/useArticle';
import Spinner from '../../Admin/spinner/Spinner';

export default function Edit() {
    const { categories, tags , getCategories, getTags } = useArticle();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [imageId, setImageId] = useState(null);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [editorOutput, setEditorOutput] = useState('');
    const [imgUpload, setImgUpload] = useState(true);
    const [error, setError] = useState(null);
    const [initialContent, setInitialContent] = useState('');

    const [categoryOptions, setCategoryOptions] = useState([
        { value: 0, label: 'Select Category' }
    ]);
    const [imageLoading, setImageLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: null,
        imgUrl: '',
        tags: []
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axiosInstance.get(`/api/articles/${slug}`);
                if (response.data) {
                    const { title, content, category_id, tags, imgUrl } = response.data;
                    setInitialContent(content);
                    setFormData({
                        title,
                        content,
                        category: categoryOptions.find(cat => cat.value === category_id),
                        tags: tags.map(tag => ({ value: tag.id, label: tag.title })),
                        imgUrl: !imageLoading ? imageId || imgUrl : ''
                    });
                    setIsLoading(false);
                } else {
                    setError('Article not found.');
                }
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'An error occurred.');
            }
        };
        fetchArticle();
    }, [slug, imageId, imageLoading, categoryOptions]);

    useEffect(()=>{
        getCategories()
        getTags()
    },[isLoading])

    useEffect(() => {
        if (!isLoading) {
            if (categories) {
                const updatedCategories = categories.map(cat => ({
                    value: cat.id,
                    label: cat.title
                }));
                setCategoryOptions([ ...updatedCategories]);
            }

            if (tags) {
                const updatedTags = tags.map(tag => ({
                    value: tag.id,
                    label: tag.title
                }));
                setTagsOptions(updatedTags);
            }
        }
    }, [categories, isLoading, tags]);

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            content: editorOutput
        }));
    }, [editorOutput]);

    const handleCategoryChange = (selectedOption) => {
        setFormData(prevData => ({
            ...prevData,
            category: selectedOption
        }));
    };

    const handleTagsChange = (newValue) => {
        setFormData(prevData => ({
            ...prevData,
            tags: newValue
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageLoading(true);
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axiosInstance.post('/api/file', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setImageId(response.data.url);
            } catch (error) {
                console.error(error.response?.data);
            } finally {
                setImageLoading(false);
                setImgUpload(true);
            }
        } else {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: formData.title,
            content: formData.content,
            imgUrl: `${process.env.REACT_APP_API_URL}/${formData.featuredImage}` || imageId,
            category_id: formData.category?.value || null,
        };


        data.tags = formData.tags.map((tag, index) => {
            return (`tags[${index}]`, tag.label);
        });

        
        console.log(data.tags)

        try {
            const response = await axiosInstance.put(`/api/articles/${slug}`, data);
            console.log('Response:', response.data);
            navigate('/dashboard/posts');
        } catch (error) {
            setError('Something went wrong, please try again.');
            console.error('Error:', error.response ? error.response.data : error.message);
        }

        console.log(data.category_id)
        console.log(formData.category?.value)
    };

    const handleImageRemove = () => {
        setImgUpload(false)
        setFormData(prevData => ({
            ...prevData,
            imgUrl: null
        }))
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
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
                        onChange={handleInputChange}
                    />

                    <label htmlFor="content">Content:</label>
                    <MyEditor
                        setEditorOutput={setEditorOutput}
                        content={initialContent}
                    />
                </div>
                <div className="sidePost">
                    <div className="sidePost__card">
                        <h3>Featured Image</h3>
                        <div className="sidePost__card__content">
                            {imgUpload && !imageLoading ? (
                                <>
                                    <img
                                        style={{ width: '100%', height: 'auto', padding: "10px" }}
                                        src={`${process.env.REACT_APP_API_URL}/${formData.imgUrl}`}
                                        alt="Featured"
                                    />
                                    <button className='btn btn--primary' type="button" onClick={handleImageRemove}>Remove</button>
                                </>
                            ) : (
                                <>
                                    {imageLoading ? (
                                        <p>Loading ...</p>
                                    ) : (
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
                                value={formData.category}
                                onChange={handleCategoryChange}
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
