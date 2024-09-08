import React, { useEffect, useState } from 'react';
import './articles.scss';
import ArticleCard from './ArticleCard';
import useArticle from '../../../../../Hooks/useArticle';

export default function Articles() {
  const { articles, getPosts } = useArticle();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const articlesPerPage = 5; // Set the number of articles to display per page

  useEffect(() => {
    getPosts();
  }, []);

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
      {/* Display the current articles */}
      {currentArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      {/* Numbered Pagination Controls */}
      <div className="Home__pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
}
