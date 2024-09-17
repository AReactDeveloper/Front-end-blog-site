import React from 'react'
import useArticle from '../../../../../Hooks/useArticle';
import ArticlesView from './ArticlesView'

export default function Articles() {
      const { articles } = useArticle();

  return (
    <ArticlesView articles={articles} title={'New Articles : '} />
  )
}
