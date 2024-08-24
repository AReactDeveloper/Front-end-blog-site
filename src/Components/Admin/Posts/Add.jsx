import React from 'react'
import MyEditor from '../../../Utils/Editor/MyEditor'

export default function Add() {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="title">Title : </label>
        <input type="text" id="title" name="title" />   
        <label htmlFor="title">Content : </label>
        <MyEditor />
      </div>
    </div>
  )
}
