import React, { useEffect, useState } from 'react'
import './articles.scss'
import { Link} from "react-router-dom"
import { IoMdArrowDropright } from "react-icons/io";


export default function ArticleCard({article}) {
  const [excerpt, setExcerpt] = useState('')
  const [articleDate, setArticleDate] = useState('')
    useEffect(()=>{
      try{
        const jsonContent = JSON.parse(article.content)
        // Find the first paragraph block
        const firstParagraphBlock = jsonContent.blocks.find(block => block.type === "paragraph");
        if (firstParagraphBlock) {
          //strip html tags
          const text = firstParagraphBlock.data.text;
          const strippedText = text.replace(/(<([^>]+)>)/gi, "");
          //strip non-breaking spaces and symbols
          const newText = strippedText.replace(/&nbsp;/gi, " ");
          // Set the excerpt using the text data from the first paragraph block
          setExcerpt(newText.slice(0, 300) + '...');

          const newDate = new Date(article.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          setArticleDate(newDate);
        }

      } catch(e){
        return
      }
    },[article])

    console.log(article)

    return (
    <article className='article__card'>
      <div className='article__card__img'>
        <img src={article.imgUrl} alt=""/>
      </div>
        <div className='article__card__content'>
          <Link><h3>{article.title}</h3></Link>
          <p className='article__card__content__meta'>
            <span className='article__card__content__meta__category'>
              {!article.category ? '' : <Link>{article?.category?.title} </Link>}
            </span>
            <span className='article__card__content__meta__date'>
              {articleDate}
            </span>
          </p>
          <p>{excerpt}</p>
          <Link to={'/article/'+article.slug} className="article__card__content__link">Read more <IoMdArrowDropright /></Link>
        </div>
      </article>
  )
}
