import React, { useEffect, useState } from 'react';
import './articles.scss';
import ArticleCard from './ArticleCard';
import { FaList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import useSiteInfo from '../../../../../Hooks/useSiteInfo';


export default function Articles({articles,title}) {

  const {siteInfo} = useSiteInfo();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const articlesPerPage = siteInfo.sitePostsPerPage || 4 ; 
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  //frontend pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array of page numbers

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='articles__head'>
        <h2>{title}</h2>
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
