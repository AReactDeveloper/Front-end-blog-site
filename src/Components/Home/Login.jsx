import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login , logout, user , isAuth } = useAuth();

    console.log(isAuth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Handle success, redirect, or show a message
            console.log("loggedin")
        } catch (error) {
            console.error('Login failed', error);
        }
    };


    if(isAuth){
return (
        <>
        {JSON.stringify(user)}
                 <button onClick={logout}>logout</button>    
            </>
    )
    }else{
return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            <br/>
        </form>
            
        </div>
    );
    }
    
    
  
     

};

export default Login;
