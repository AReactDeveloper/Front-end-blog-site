import React from 'react'
import './sidebar.scss'
import SearchWidget from '../../../base/Widgets/Search/SearchWidget'
import CategoriesWidget from '../../Widgets/categories/CategoriesWidget'
import TagsWidget from '../../Widgets/tags/TagsWidget'

export default function Sidebar() {
  return (
    <>
      <SearchWidget />
      <div className="sidebar__card">
        <h3 className="sidebar__card__title">
          About us
        </h3>
        <div className='sidebar__card_content'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto harum est, voluptate recusandae velit error?
        </div>
      </div>
      <CategoriesWidget />
      <TagsWidget />      
    </>
  )
}
