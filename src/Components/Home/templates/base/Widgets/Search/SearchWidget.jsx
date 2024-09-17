import React, { useState } from 'react'
import {useNavigate }  from 'react-router-dom'
import './searchWidget.scss'

export default function SearchWidget() {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [inputError, setInputError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery) {
      navigate(`/search/${searchQuery}`)
    } else {
      setInputError(true)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
    if(e.target.value == '') {
      setInputError(true)
    }else{
      setInputError(false)
    }
  }

  return (
    <div className='sidebar__card'>
        <h3 className='sidebar__card__title'>Search</h3>
       <div className="sidebar__card_content">
            <form onSubmit={handleSubmit}>
                <input className={inputError ? 'input-error' : ''} value={searchQuery} onChange={handleChange} type="text" />
                <label className={inputError ? 'error-message' : 'input-lable'}>please enter a search query</label>
                <button>Search</button>
            </form>
       </div>
    </div>
  )
}
