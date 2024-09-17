import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import useArticle from '../../../../../Hooks/useArticle'
import '../Articles/articles.scss';
import ArticleView from '../Articles/ArticlesView';
import './search.scss';


export default function Search() {

    const {query} = useParams()
    const { articles, getPosts } = useArticle();
    const [searchResults,setSearchResults] = useState([])

    useEffect(() => {
      const getPostCaller = async ()=>{
        await getPosts()
      }
      getPostCaller();
    },[query])

    useEffect(()=>{
      setSearchResults(searchQuery(articles,query))
      console.log(articles)
      console.log(searchResults)
      console.log(query)
    },[query])

     useEffect(() => {
      console.log(searchResults);
    }, [searchResults]);

  const searchQuery = (data, query) => {
    if (!data || !query) {
      return [];
    }

    const titleWords = query.toLowerCase().split(' ');
    const contentWords = query.toLowerCase().split(' ');

    return data.map(item => {
      if (!item || !item.title || !item.content) {
        return { ...item, score: 0 };
      }

      let titleMatches = 0;
      let contentMatches = 0;

      // Count the number of title matches
      titleWords.forEach(word => {
        if (item.title.toLowerCase().includes(word)) {
          titleMatches++;
        }
      });

      // Count the number of content matches
      contentWords.forEach(word => {
        if (item.content.toLowerCase().includes(word)) {
          contentMatches++;
        }
      });

      // Total score (you can adjust the weight of title vs content matches)
      const totalScore = titleMatches + contentMatches;

      // Return the item along with the score
      return { ...item, score: totalScore };
    })
    .filter(item => item && item.score > 0) // Only return items with at least one match
    .sort((a, b) => (b?.score || 0) - (a?.score || 0)); // Sort by the highest score
  };



 if (searchResults.length === 0) {
    return (
      <>
      <div className='search-head'>
          <Link to='/'><FaArrowLeft /> Back home</Link>
        </div>
      <div><h2>No Articles Found</h2></div>
      </>
    );
  } else {
    console.log(searchResults)
    return (
      <>
        <div className='search-head'>
          <Link to='/'><FaArrowLeft /> Back home</Link>
        </div>
        <ArticleView articles={searchResults} title={'Search Results :'} />
      </>
    );
  }
}