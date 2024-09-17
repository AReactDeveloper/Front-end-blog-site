import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const SiteInfoContext = createContext();

export const SiteInfoProvider = ({ children }) => {
    const [siteInfo, setSiteInfo] = useState({});


    useEffect(()=>{
        getSiteInfo()
    },[])

    const getSiteInfo = async () => {
        try {
            const res = await axiosInstance.get('/api/settings');
            setSiteInfo(res.data || {})
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SiteInfoContext.Provider value={{siteInfo, getSiteInfo}}>
            {children}
        </SiteInfoContext.Provider>
    )
}