import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useArticle from '../../../../../Hooks/useArticle'
import Spinner from '../../../../Admin/spinner/Spinner'

export default function SingleArticle() {
    const { slug } = useParams();
    const { getPost } = useArticle(); 
    const [article, setArticle] = useState({});
    const [contentHtml, setContentHtml] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            try {
                const data = await getPost(slug);
                setArticle(data);
                console.log(data)
                if (data.content) {
                    try {
                        const jsonData = JSON.parse(data.content);
                        editorJsToHtml(jsonData);
                    } catch (error) {
                        console.error('Error parsing content:', error);
                    }
                }
                setIsLoading(false)
            } catch (err) {
                console.error('Error fetching article:', err);
            }
        };

        fetchArticle();
    }, [slug]);

    function editorJsToHtml(editorData) {
        let html = '';

        if (editorData && editorData.blocks) {
            editorData.blocks.forEach(block => {
                switch (block.type) {
                    case 'header':
                        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                        break;
                    case 'paragraph':
                        html += `<p>${block.data.text}</p>`;
                        break;
                    case 'list':
                        if (block.data.style === 'unordered') {
                            html += '<ul>';
                            block.data.items.forEach(item => {
                                html += `<li>${item}</li>`;
                            });
                            html += '</ul>';
                        } else {
                            html += '<ol>';
                            block.data.items.forEach(item => {
                                html += `<li>${item}</li>`;
                            });
                            html += '</ol>';
                        }
                        break;
                    case 'image':
                        html += `<img src="${block.data.file.url}" alt="${block.data.caption || ''}" />`;
                        break;
                    case 'quote':
                        html += `<blockquote>${block.data.text}</blockquote>`;
                        break;
                    case 'code':
                        html += `<pre><code>${block.data.code}</code></pre>`;
                        break;
                    case 'embed':
                        html += `<iframe src="${block.data.url}" frameborder="0"></iframe>`;
                        break;
                    // Add more cases to handle other block types as needed
                    default:
                        console.log(`Unknown block type: ${block.type}`);
                        break;
                }
            });
        }

        setContentHtml(html);
    }

    if(isLoading){
        return <Spinner />

    }else{
        return (
        <div className='singleArticle'>
            <h1>{article.title}</h1>
            <a href="#">{article.category.title}</a>
            {article.imgUrl && <img src={article.imgUrl} alt="Article" />}
            <br />
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <ul>
                {article.tags.map((tag) => (
                <li key={tag.id}>{tag.title}</li>
                ))}
            </ul>
        </div>
        );
    }
}
