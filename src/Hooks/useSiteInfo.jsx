import { useContext } from 'react';
import { SiteInfoContext } from '../context/SiteInfoContext';

const useSiteInfo = () => {
    return useContext(SiteInfoContext);
};

export default useSiteInfo;
