
import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles,SetArticles] = useState();
    const [categories,SetCategories] = useState();
    const [tags,SetTags] = useState();
    const [isLoading,setloading] = useState(true);
    const [error,setErrror] = useState('');

    useEffect(() => {
        getPosts();
        getCategories()
        getTags()
    }, [])

    const getPosts = async () => {
        setloading(true)
        try {
            const res = await axiosInstance.get('/api/articles')
            SetArticles(res.data)
            setloading(false);
        } catch (err) {
                setErrror('something went wrong while fetching articles try again')
                setloading(false)   
        }
    }

    const getCategories = async ()=>{
        setloading(true)
        try {
            const res = await axiosInstance.get('/api/categories')
            SetCategories(res.data)
            setloading(false);
        } catch (err) {
            setErrror('something went wrong while fetching categories try again')
            setloading(false)
        }
    }

    const getTags = async ()=>{
        setloading(true)
        try {
            const res = await axiosInstance.get('/api/tags')
            SetTags(res.data)
            setloading(false);
        } catch (err) {
                setErrror('something went wrong while fetching categories try again')
                setloading(false)
        }
    }

    return (
        <ArticleContext.Provider value={{ error, articles , isLoading , categories , tags}}>
            {children}
        </ArticleContext.Provider>
    )
}