import React, { useEffect, useState } from 'react';
import './articles.scss';
import ArticleCard from './ArticleCard';
import useArticle from '../../../../../Hooks/useArticle';

export default function Articles() {
  const { articles, getPosts } = useArticle();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Number of articles per page

  useEffect(() => {
    getPosts();
  }, []);

  // Calculate the indices for slicing the articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <>
      {/* Display the current articles */}
      {currentArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      {/* Pagination controls */}
      <div className="Home__pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination__button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
