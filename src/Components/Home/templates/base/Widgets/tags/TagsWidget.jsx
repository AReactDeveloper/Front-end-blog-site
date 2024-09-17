import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './TagsWidget.scss'
import useArticle from '../../../../../../Hooks/useArticle'

export default function CategoriesWidget({isShowTitle = true}) {

    const  {tags} = useArticle()

  return (
    <div className='sidebar__card'>
        {isShowTitle  && <h3 className='sidebar__card__title'>Tags</h3>}
       <div className="sidebar__card_content">
           <ul className="tags-list">
            {tags.map((tag)=>(
                <li key={tag.id}><Link to={`/tag/${tag.title}`}>{tag.title}</Link></li>
            ))}
            </ul>
       </div>
    </div>
  )
}
