import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useArticle from '../../../../../Hooks/useArticle';
import Spinner from '../../../../Admin/spinner/Spinner';
import { editorJsToHtml } from '../../../../../Utils/Editor/editorJsToHtml';
import { FaArrowLeft } from 'react-icons/fa';
import './singleArticle.scss';

export default function SingleArticle() {
    const { slug } = useParams();
    const { getPost } = useArticle(); 
    const [article, setArticle] = useState({});
    const [contentHtml, setContentHtml] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [articleDate, setArticleDate] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true)
            const data = await getPost(slug)
            setArticle(data)
            setContentHtml(editorJsToHtml(data.content))
            const newDate = new Date(article.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          setArticleDate(newDate);
            setIsLoading(false)
        };
        
        fetchArticle();
    }, [slug]);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[slug])


    

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <div className='singleArticle'>
                <div className='singleArticle__navigation'>
                    <Link to='/'><FaArrowLeft /> Back home</Link>
                    <p className='singleArticle__navigation__date'>{articleDate}</p>
                </div>
                <h1>{article.title}</h1>
                
                {article.category && <Link className='singleArticle__category' to={`/category/${article.category.title}`} href="#">{article.category.title}</Link>}
                
                {article.imgUrl && <img src={article.imgUrl} alt="Article" />}
                
                <br />

                <div className='content' dangerouslySetInnerHTML={{ __html: contentHtml }} />

                {article.tags && (
                    <ul className='singleArticle__tags'>
                        {article.tags.map((tag) => (
                    <li key={tag.id}><Link to={`/tag/${tag.title}`}>{tag.title}</Link></li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
