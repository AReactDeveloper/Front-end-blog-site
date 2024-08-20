import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        //get user
        getUser();
        
    }, []);

    //csrf;
    const login = async (email,password) =>{
        const res = await axiosInstance.post('/api/login',{
        email,
        password
        });
        localStorage.setItem('sanctum_token',res.data.token)
        await getUser(); //as an update
        setIsAuth(true);
        return res
    }

    const getUser = async () => {
        const user = await axiosInstance.get('/api/user')
        .then(response => {
            console.log('User Data:', response.data);
            setIsAuth(true)
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
        setUser(user);

    };

   const logout = async () =>{
    console.log("logging out")
    await axiosInstance.post('/api/logout')
      .then(response => {
        console.log('loggoed out');
        localStorage.removeItem('sanctum_token');
        setIsAuth(false);
        return response.data;
      })
      .catch(error => {
        console.error('Error Logout:', error);
      });

  }


    return (
        <AuthContext.Provider value={{ isAuth , user, login, logout , getUser }}>
            {children}
        </AuthContext.Provider>
    );
};
