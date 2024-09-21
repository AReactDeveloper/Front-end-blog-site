import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePage from '../../../../../Hooks/UsePage';
import { editorJsToHtml } from '../../../../../Utils/Editor/editorJsToHtml';
import { FaArrowLeft } from 'react-icons/fa';
import './singlePage.scss';

export default function SinglePage() {
    const { slug } = useParams();
    const { getPage } = usePage();
    const [isLoading, setIsLoading] = useState(true);
    const [contentHtml, setContentHtml] = useState('');
    const [singlePage, setSinglePage] = useState(null); // Changed to null for better error handling

    useEffect(() => {
        const fetchPage = async () => {
            setIsLoading(true)
            const data = await getPage(slug)
            if(data){
                setSinglePage(data.data)
                setContentHtml(editorJsToHtml(data.data.content))
            }else{
                setSinglePage(null)
            }
            setIsLoading(false)
        };

        fetchPage();
    }, [slug]); // Only dependencies needed

    if (isLoading) {
        return <div className="loading">Loading...</div>
    }

    if (!singlePage) {
        return <div className="error-block">Page not found.</div>; // Handle case where page is not found
    }

    return (
        <div className='singlePage'>
            <div className='singlePage__navigation'>
                <Link to='/'><FaArrowLeft /> Back home</Link>
            </div>
            <h1>{singlePage.title}</h1>                
            <div className='content' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    );
}
