import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Start with true to handle initial load
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user data on component mount
        getUser();
    }, []);

    const login = async (email, password) => {
        setIsLoading(true); // Start loading
        setError(''); // Clear previous error

        try {
            const res = await axiosInstance.post('/api/login', { email, password });
            
            // Assuming your token is under res.data.token
            localStorage.setItem('sanctum_token', res.data.token);
            
            await getUser();
            setIsAuth(true); 

        } catch (err) {
            if (err.response) {
                setError(err.response.data.messages || 'Login failed. Please try again.');
            } else if (err.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false); 
        }
    };


    const getUser = async () => {
        setIsLoading(true); // Start loading
        try {
            const response = await axiosInstance.get('/api/user');
            setUser(response.data);
            setIsAuth(true);
        } catch (error) {
            console.error('Error fetching user:', error);
            setIsAuth(false);
            setUser(null);
        } finally {
            setIsLoading(false); // Stop loading after operation
        }
    };

    const logout = async () => {
        setIsLoading(true); // Start loading
        try {
            await axiosInstance.post('/api/logout');
            localStorage.removeItem('sanctum_token');
            setIsAuth(false);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoading(false); // Stop loading after operation
        }
    };

    return (
        <AuthContext.Provider value={{ isLoading, error, isAuth, user, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};
