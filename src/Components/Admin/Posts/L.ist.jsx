import React, { useEffect, useState } from 'react';
import useArticle from '../../../Hooks/useArticle';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Spinner from '../spinner/Spinner';

export default function List() {
    const [postsCount, setPostsCount] = useState(5); // Number of posts per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const { articles, isLoading , tags } = useArticle();

    // Calculate the number of pages
    const totalPages = Math.ceil(articles.length / postsCount);

    // Calculate the range of articles to display
    const indexOfLastArticle = currentPage * postsCount;
    const indexOfFirstArticle = indexOfLastArticle - postsCount;
    const renderedArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    console.log(articles)

    // Update articles per page
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when postsCount changes
    }, [postsCount]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle posts count change
    const handleSelect = (e) => {
        setPostsCount(parseInt(e.target.value, 10));
    };


    if (isLoading) {
        return <Spinner />;
    }

    console.log(tags)

    return (
        <div className='posts__list'>
            <label htmlFor="articleCount">Articles To load : </label>
            <select onChange={handleSelect} name="articleCount" id="articleCount" value={postsCount}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>

            <div className="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Date of Publish</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedArticles.map(({ id, title, created_at , category , tags }) => (
                            <tr key={id}>
                                <td>{title}</td>
                                <td><Link to={"/"}>{category?.title}</Link></td>
                                <td>
                                    {tags?.length > 0 ? (
                                    tags.map((tag) => (
                                        <Link key={tag.id} to={"/"}>{tag.title}, </Link>
                                        ))
                                    ) : (
                                        <p className='text_gray'>No tags available</p>  // This will render if `tags` is empty or undefined
                                    )}
                                </td>
                                <td>{new Date(created_at).toLocaleDateString()}</td>
                                <td className='actions'>
                                    <Link className='fill-green'><IoEyeSharp /></Link>
                                    <Link className='fill-blue'><MdEdit /></Link>
                                    <Link className='fill-red'><FaTrash /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    );
}
