import React, { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import useArticle from '../../../../../Hooks/useArticle';
import Spinner from '../../../../Admin/spinner/Spinner';
import { editorJsToHtml } from '../../../../../Utils/Editor/editorJsToHtml';

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
            setIsLoading(false)
        };
        
        fetchArticle();
        console.log(isLoading)
    }, [slug]);


    

    if (isLoading) {
        return <Spinner />;
    } else {
        return (
            <div className='singleArticle'>
                <h1>{article.title}</h1>
                <p>{articleDate}</p>
                
                {/* Render category title if available */}
                {article.category && <a href="#">{article.category.title}</a>}
                
                {/* Render image if available */}
                {article.imgUrl && <img src={article.imgUrl} alt="Article" />}
                
                <br />

                {/* Render the article content */}
                <div className='content' dangerouslySetInnerHTML={{ __html: contentHtml }} />

                {/* Render tags if available */}
                {article.tags && (
                    <ul>
                        {article.tags.map((tag) => (
                            <li key={tag.id}>{tag.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
