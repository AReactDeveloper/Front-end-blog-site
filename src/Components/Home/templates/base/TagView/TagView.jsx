import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useArticle from '../../../../../Hooks/useArticle';
import ArticlesView from '../Articles/ArticlesView';
import TagsWidget from '../Widgets/tags/TagsWidget';

export default function TagView() {
  const { tag } = useParams();
  const { tags, getTags } = useArticle();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getTags();
  }, [tag]);

  useEffect(() => {
    if (tags) {
      const filteredArticles = tags
        .filter(t => t.title === tag) 
        .flatMap(t => t.articles); 
      setArticles(filteredArticles);
    }
  }, [tags, tag]);

  return (
    <div className='category-view'>
      <TagsWidget isShowTitle={false}/>
      <ArticlesView articles={articles} title={`#${tag}`} />
    </div>
  );
}
