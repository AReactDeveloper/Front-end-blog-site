import React, { useEffect, useState } from 'react';
import Navbar from './Layouts/Navbar/Navbar';
import Sidebar from './Layouts/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Styles/base.scss';
import { Helmet } from 'react-helmet';
import useSiteInfo from '../../../../Hooks/useSiteInfo';

export default function Home() {
    const { siteInfo, getSiteInfo } = useSiteInfo();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteInfo = async () => {
            setLoading(true);
            await getSiteInfo();
            setLoading(false);
        };

        fetchSiteInfo();

        const handleBeforeUnload = () => {
            setLoading(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            setLoading(false);
        };
    }, []);

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Loading...</title>
                </Helmet>
                <div className='loading'>Loading...</div>
            </>
        );
    } else {
        const siteName = siteInfo?.siteName || 'Default Site Name';
        const siteDescription = siteInfo?.siteDescription || 'Default description';
        const siteFavicon = siteInfo?.siteFavicon || 'default-favicon.png';

        return (
            <>
                <Helmet>
                    <title>{`${siteName} | ${siteDescription}`}</title>
                    <meta name="description" content={siteDescription} />
                    <link rel="icon" href={siteFavicon} type="image/png" />
                    <meta name="keywords" content="Home" />
                    <meta name="author" content="Home" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="robots" content="noindex, nofollow" />
                    <link rel="canonical" href="https://www.google.com/" />
                    <link rel="apple-touch-icon" href="https://www.google.com/s2/favicons?domain=https://www.google.com/" />
                </Helmet>
                <div className='homeWrapper'>
                    <Navbar />
                    <div className="homeWrapper__container">
                        <div className="homeWrapper__main__area">
                            <Outlet />
                        </div>
                        <aside className='homeWrapper__main__sidebar'>
                            <Sidebar />
                        </aside>
                    </div>
                </div>
            </>
        );
    }
}
