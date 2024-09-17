import { useContext } from 'react';
import { PageContext } from '../context/PageContext';

const UsePage = () => {
    return useContext(PageContext);
};

export default UsePage;
