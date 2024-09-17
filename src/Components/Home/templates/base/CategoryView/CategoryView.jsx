import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useArticle from '../../../../../Hooks/useArticle';
import ArticlesView from '../Articles/ArticlesView';

export default function CategoryView() {
  const { category } = useParams();
  const { categories, getCategories } = useArticle();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    getCategories();
  }, []);

  useEffect(() => {
    // Filter articles based on the category parameter
    if (categories) {
      const filteredArticles = categories
        .filter(cat => cat.title === category)
        .flatMap(cat => cat.articles);
      setArticles(filteredArticles);
    }
  }, [categories, category]);

  return (
    <div className='category-view'>
      <ArticlesView articles={articles} title={`Articles in: ${category}`} />
    </div>
  );
}
