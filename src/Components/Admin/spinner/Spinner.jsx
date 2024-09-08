import React from 'react'
import './spinner.scss'

export default function Spinner() {
  return (
    <div className='spinner'>
        <div className="loader"></div>
        <h3>Loading content ...</h3>
    </div>
  )
}
