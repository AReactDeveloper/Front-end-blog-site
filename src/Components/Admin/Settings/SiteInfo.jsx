import React, { useEffect, useState } from 'react';
import useSiteInfo from '../../../Hooks/useSiteInfo';
import axiosInstance from '../../../api/axiosInstance';
import './siteInfo.scss'

export default function SiteInfo() {
    const { siteInfo, getSiteInfo } = useSiteInfo();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        siteName: '',
        siteDescription: '',
        siteLogo:'',
        siteFavicon: '',
        sitePostsPerPage:0,
        siteLogoOptions: '',
    });

    //clear error and message
    useEffect(() => {
        const intervalId = setInterval(() => {
            setError(null);
            setMessage(null);
        }, 3000);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [error, message]);

  // Update formData when siteInfo is available
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSiteInfo(); // Fetch site info here
        console.log(siteInfo.sitePostsPerPage)
        // Check if siteInfo is available after fetching
        if (siteInfo) {
          setFormData({
            siteName: siteInfo.siteName || '',
            siteDescription: siteInfo.siteDescription || '',
            sitePostsPerPage: siteInfo.sitePostsPerPage || 0,
            siteLogo: siteInfo.siteLogo || '',
            siteFavicon: siteInfo.siteFavicon || '',
            siteLogoOptions: siteInfo.siteLogoOptions || '',
          });
        }
      } catch (error) {
        console.error('Error fetching site info:', error);
      }
    };

    fetchData(); // Call the async function
    console.log(siteInfo)
  }, []); // Empty dependency array to run only on mount

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object for submission
    const data = new FormData();
    data.append('siteName', formData.siteName);
    data.append('siteDescription', formData.siteDescription);
    data.append('sitePostsPerPage', formData.sitePostsPerPage);
    data.append('siteLogoOptions', formData.siteLogoOptions);
     try {
        axiosInstance.put('/api/settings/1',formData)
        .then((response) => {
            console.log(response)
          setMessage('Site info updated successfully');
        })
        .catch((error) => {
            console.log(error)
          setError('Something went wrong while updating the site info');
        });
        } catch (error) {
            console.error(error);
        }
  };

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update formData with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleLogoDelete = (e)=>{
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      siteLogo: ''
    }));
  }

  const handleFaviconDelete = (e)=>{
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      siteFavicon: ''
    }));
  } 

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    const {name} = e.target
    const formData = new FormData();
    formData.append('file', file);
    if (!file) {
      setError('No file selected');
      return;
    }
    try {
      const res = await axiosInstance.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setFormData((prevData) => ({  // Update formData with the new value
          ...prevData,
          [name]: `http://localhost:9000/${res.data.url}`
        }));
        setMessage('Site' + name + ' uploaded successfully');
      } else {
        setError('Something went wrong while updating the site info');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong while updating the site info');
    }
  };

  const handleLogoOptionChange = (e) => {
    const {value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      siteLogoOptions: value
    }))
  };

  useEffect(()=>{
    console.log(formData.siteLogoOptions)
  },[formData.siteLogoOptions])

  return (
    <div className="siteInfo">
      {message && <p className="message-block">{message}</p>}
      {error && <p className="error-block">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="siteTitle">Site Title:</label>
          <input
            onChange={handleChange}
            type="text"
            name="siteName"
            value={formData.siteName}
            placeholder="Site Title"
          />
        </div>
        
        <div className="col-grid">
          {formData.siteLogo ? (
          <div className="form-group">
            <label htmlFor="siteLogo">Site Logo:</label>
            <img src={formData.siteLogo} alt="" />
            <button onClick={handleLogoDelete}>remove</button>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="siteLogo">Site Logo:</label>
            <input
              onChange={handleFileUpload}
              type="file"
              name="siteLogo"
              accept="image/*"
            />
          </div>
        )}

        {formData.siteFavicon ? (
          <div className="form-group">
            <label htmlFor="siteFavicon">Site FavIcon:</label>
            <img src={formData.siteFavicon} alt="" />
            <button onClick={handleFaviconDelete}>remove</button>
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="siteFavicon">Site FavIcon:</label>
            <input
              onChange={handleFileUpload}
              type="file"
              name="siteFavicon"
              accept="image/*"
            />
          </div>
        )}
        </div>
        <div className='form-group'>
              <label htmlFor="logoOptions">Select a Logo Option:</label>
              <select onChange={handleLogoOptionChange} id="logoOptions" value={formData.siteLogoOptions}>
                <option value="logo">Logo Only</option>
                <option value="logo_title">Logo and Title</option>
                <option value="logo_title_description">Logo, Title, and Description</option>
                <option value="title_description">Title and Description</option>
              </select>
          </div>

        <div className="form-group">
          <label htmlFor="siteDescription">Site Description:</label>
          <textarea
            onChange={handleChange}
            name="siteDescription"
            value={formData.siteDescription}
            placeholder="Site Description"
          />
        </div>
         <div className="form-group">
          <label htmlFor="PostPerPage">Post Per Page:</label>
          <input
            onChange={handleChange}
            type="number"
            name="sitePostsPerPage"
            value={formData.sitePostsPerPage}
          />
        </div>
        <button type="submit">Submit changes</button>
      </form>
    </div>
  );
}
