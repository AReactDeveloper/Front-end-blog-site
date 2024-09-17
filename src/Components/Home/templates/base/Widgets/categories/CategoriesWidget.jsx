import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './CategoriesWidget.scss'
import useArticle from '../../../../../../Hooks/useArticle'

export default function CategoriesWidget() {

    const  {categories} = useArticle()
  return (
    <div className='sidebar__card'>
        <h3 className='sidebar__card__title'>Categories</h3>
       <div className="sidebar__card_content">
           <ul className="category-list">
            {categories.map((category)=>(
                <li key={category.id}><Link to={`/category/${category.title}`}>{category.title}</Link></li>
            ))}
            </ul>
       </div>
    </div>
  )
}
