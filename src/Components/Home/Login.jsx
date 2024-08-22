import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import './login.scss';
import Spinner from '../Admin/spinner/Spinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuth, error , isLoading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    if (isAuth ) {
        return (
            <>
            <p>Already in redirecting to dashboard ...</p>
            <Navigate to='/dashboard' />
            </>
        );
    }

    if(!isLoading){
        
        return (
        <div className='wrapper'>
            <div className='login'>
                <GrUserAdmin size={100} aria-hidden="true" />
                <h1>Login</h1>
                <form onSubmit={handleSubmit} aria-live="assertive">
                    <div>
                        {error && <div className="error" role="alert">{error}</div>}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email" // Changed to email type for validation
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-required="true"
                            aria-describedby="email-helper-text"
                        />
                        <span id="email-helper-text" className="visually-hidden">Enter your email address.</span>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password" // Changed to password type for security
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-required="true"
                            aria-describedby="password-helper-text"
                        />
                        <span id="password-helper-text" className="visually-hidden">Enter your password.</span>
                    </div>
                    <button className='login__btn' type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
    }else{
        return <Spinner />
    }
};

export default Login;
