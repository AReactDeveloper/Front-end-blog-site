import { useContext } from 'react';
import { ArticleContext } from '../context/ArticleContext';

const useArticle = () => {
    return useContext(ArticleContext);
};

export default useArticle;
