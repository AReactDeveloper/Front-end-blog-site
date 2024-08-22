import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';
import Spinner from '../Components/Admin/spinner/Spinner';

export default function ProtectedRoute({ children }) {

    const { isAuth, isLoading } = useAuth();

    console.log(isLoading);
    if (isLoading) {
        return <Spinner />
    }

    if (!isAuth) {
        return <Navigate to="/login" />
    }

    return children;

}


