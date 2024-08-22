import React from 'react'
import useArticle from '../../../Hooks/useArticle';

export default function TagList() {
  
     const {tags} = useArticle();

  return (
    <div className="responsive-table">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Post Count</th>
                </tr>
            </thead>
            <tbody>
                {tags.map((tag) => (
                    <tr key={tag.id}>
                        <td>{tag.title}</td>
                        <td>{tag.articles_count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
