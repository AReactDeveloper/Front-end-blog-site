import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getPosts(), getCategories(), getTags()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const getPosts = async () => {
        try {
            const res = await axiosInstance.get('/api/articles');
            setArticles(res.data || []);
        } catch (err) {
            setError('Something went wrong while fetching articles. Please try again.');
        }
    };

    const getPost = async (id) => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/api/articles/${id}`);
            setLoading(false);
            return res.data || null;
        } catch (err) {
            setError('Something went wrong while fetching the article. Please try again.');
            setLoading(false);
            return null;
        }
    };

    const getCategories = async () => {
        try {
            const res = await axiosInstance.get('/api/categories');
            setCategories(res.data || []);
        } catch (err) {
            setError('Something went wrong while fetching categories. Please try again.');
        }
    };

    const getTags = async () => {
        try {
            const res = await axiosInstance.get('/api/tags');
            setTags(res.data || []);
        } catch (err) {
            setError('Something went wrong while fetching tags. Please try again.');
        }
    };

    const updatePost = async (id, data) => {
        try {
            const res = await axiosInstance.put(`/api/articles/${id}`, data);
            return res.data || null;
        } catch (err) {
            setError('Something went wrong while updating the article. Please try again.');
            return null;
        }
    };

    return (
        <ArticleContext.Provider value={{ getPosts, getPost, updatePost , getCategories, getTags, error, articles, isLoading, categories, tags }}>
            {children}
        </ArticleContext.Provider>
    );
};
