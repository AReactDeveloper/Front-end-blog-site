import React, { useEffect } from 'react'
import './logo.scss'

export default function Logo({title,logo,description,logoOptions = 'logo_title'}) {


    useEffect(()=>{
        console.log(logoOptions)
    },[logoOptions])

  if(logoOptions === 'logo'){
    return (
      <div className="logo">
        <img src={logo} alt={title} />
      </div>
    )
  }

  if(logoOptions === 'logo_title'){
    return (
      <div className="logo">
        <img src={logo} alt={title} />
        <h1>{title}</h1>
      </div>
    )
  }

  if(logoOptions === 'logo_title_description'){
    return (
      <div className="logo">
        <img src={logo} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  if(logoOptions === 'title_description'){
    return (
      <div className="logo">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  }

}
