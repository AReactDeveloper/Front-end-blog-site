import React, { useEffect, useState } from 'react';
import './articles.scss';
import ArticleCard from './ArticleCard';
import useArticle from '../../../../../Hooks/useArticle';
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";


export default function Articles() {
  const { articles, getPosts } = useArticle();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const articlesPerPage = 5; // Set the number of articles to display per page
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // Calculate the indices for the articles to display
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array of page numbers

  // Handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='articles__head'>
        <h2>Latest Articles : </h2>
        <div className='articles__head__actions'>
          <button onClick={()=>setIsGridView(false)} className='btn'>
            <FaList />
          </button>
          <button onClick={()=>setIsGridView(true)} className='btn'>
            <IoGrid />
          </button>
        </div>
      </div>
      <div className={isGridView ? 'articles__grid' : 'articles'}>
        {currentArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {/* Numbered Pagination Controls */}
      <div className="Home__pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? 'active btnPaginate' : 'btnPaginate'}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
