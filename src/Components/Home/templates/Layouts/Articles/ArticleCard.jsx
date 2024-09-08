import React, { useEffect, useState } from 'react'
import './articles.scss'
import { Link} from "react-router-dom"

export default function ArticleCard({article}) {
  const [excerpt, setExcerpt] = useState('')
    //pagination
    //search
    //display switch
    useEffect(()=>{
      try{
        const jsonContent = JSON.parse(article.content)
        jsonContent.blocks.forEach(block=>{
          if(block.type == "paragraph"){
            setExcerpt(block.data.text.slice(0,120)+'...')
          }
        })
      } catch(e){
        return
      }
    },[article])

    return (
    <article className='article__card'>
        <div className='article__card__content'>
          <Link><h3>{article.title}</h3></Link>
          <p>{excerpt}</p>
          <Link to={'/'+article.slug} className="article__card__content__link">Read more</Link>
        </div>
        <img src={article.imgUrl} alt=""/>
      </article>
  )
}
