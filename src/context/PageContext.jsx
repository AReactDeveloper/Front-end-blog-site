import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get('/api/pages');
            setPages(res.data || []);
        };
        fetchData();
    }, []);

    return (
        <PageContext.Provider value={{ pages }}>
            {children}
        </PageContext.Provider>
    );
}