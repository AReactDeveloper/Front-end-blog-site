import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState([]);

    useEffect(() => {
        getPages()
    }, []);

    const getPages = async () => {
        const res = await axiosInstance.get('/api/pages');
        setPages(res.data || []);
    };

    const getPage = async (slug) => {
        const res = await axiosInstance.get('/api/pages/'+ slug);
        return res || [];
    };

    return (
        <PageContext.Provider value={{ pages , page , getPages , getPage }}>
            {children}
        </PageContext.Provider>
    );
}