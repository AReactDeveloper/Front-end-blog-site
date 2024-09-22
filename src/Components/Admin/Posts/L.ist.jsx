import React, { useEffect, useState } from 'react';
import useArticle from '../../../Hooks/useArticle';
import { Link, useLocation } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Spinner from '../spinner/Spinner';
import axiosInstance from '../../../api/axiosInstance';
import Table from '../Table/Table';

export default function List() {
    const [postsCount, setPostsCount] = useState(5); // Number of posts per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const { articles, isLoading , tags, getPosts } = useArticle();

    const [message , setMessage] = useState('');
    const [error , setError] = useState('');

    // Calculate the number of pages
    const totalPages = Math.ceil(articles.length / postsCount);

    // Calculate the range of articles to display
    const indexOfLastArticle = currentPage * postsCount;
    const indexOfFirstArticle = indexOfLastArticle - postsCount;
    const renderedArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const location = useLocation();
    let Routemessage = location.state?.message || '';


    useEffect(()=>{
        if(Routemessage){
            setMessage(location.state?.message);
        }
    },[location.state?.message])

    //inital posts on mount
    useEffect(()=>{
        getPosts();
    },[])

    // Update articles per page
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when postsCount changes
    }, [postsCount]);

    useEffect(()=>{
        //clear error and message 
        setTimeout(() => {
            setError(null)
            setMessage(null)
        }, 2000);
    },[error,message])

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle posts count change
    const handleSelect = (e) => {
        setPostsCount(parseInt(e.target.value, 10));
    };

    //handle delete post
    const handleDelete = (id) =>{
        window.confirm("Are you sure you want to delete this post ?") &&
        
        //request delete from server
        axiosInstance
        .delete(`/api/articles/${id}`)
        .then((response) => {
            getPosts();
            if(response.status == 204){
                setMessage('Article deleted')
            }else{
                setError('Article was not found')
            }
        })
        .catch((error) => {
            setError('Article was not found');
        });
    }


    if (isLoading) {
        return <Spinner />;
    }


    return (
        <>
            {message ? <p style={{color:'white', backgroundColor:'green' , padding:'20px'}}>{message}</p> : ''}
            {error ? <p style={{color:'white', backgroundColor:'red' , padding:'20px'}}>{error}</p> : ''}
        <div className='posts__list'>
            <label htmlFor="articleCount">Articles To load : </label>
            <select onChange={handleSelect} name="articleCount" id="articleCount" value={postsCount}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>

            <div className="responsive-table">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Tags</th>
                            <th>Date of Publish</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
  {renderedArticles.length === 0 ? (
    <tr>
      <td colSpan="6">No Posts Found</td>
    </tr>
  ) : (
    renderedArticles.map(({ id, slug, title, created_at, category, tags, imgUrl }) => (
      <tr key={id}>
        <td>{title}</td>
        <td><Link to="/">{category?.title || 'No category'}</Link></td>
        <td>
          {imgUrl ? (
            <img style={{ width: 70, height: 70 }} src={imgUrl} alt={title} />
          ) : (
            <p className='text_gray'>No image available</p>
          )}
        </td>
        <td>
          {tags?.length > 0 ? (
            tags.map((tag) => (
              <Link key={tag.id} to="/">{tag.title}, </Link>
            ))
          ) : (
            <p className='text_gray'>No tags available</p>
          )}
        </td>
        <td>{new Date(created_at).toLocaleDateString()}</td>
        <td className='actions'>
          <Link className='fill-green' target='_blank' to={`/article/${slug}`}><IoEyeSharp /></Link>
          <Link to={`/dashboard/posts/edit/${slug}`} className='fill-blue'><MdEdit /></Link>
          <a onClick={() => handleDelete(id)} className='fill-red'><FaTrash /></a>
        </td>
      </tr>
    ))
  )}
</tbody>

                    </Table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    </>
    );
}
