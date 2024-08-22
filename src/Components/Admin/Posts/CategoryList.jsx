import React from 'react'
import useArticle from '../../../Hooks/useArticle'

export default function CategoryList() {

    const {categories} = useArticle();

    console.log(categories)

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
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td>{category.articles_count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
