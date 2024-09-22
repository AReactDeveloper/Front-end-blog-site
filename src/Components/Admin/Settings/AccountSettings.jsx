    import React, { useEffect, useState } from 'react';
    import './accountsettings.scss';
    import axiosInstance from '../../../api/axiosInstance';

    export default function AccountSettings() {
        const [error, setError] = useState('');
        const [message, setMessage] = useState('');
        const [isShowPW, setIsShowPW] = useState(false);
        const [isLoading,setIsLoading] = useState(false)

        const [formData, setFormData] = useState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            email:'',
            confirmEmail:''
        });

        useEffect(() => {
            if (error || message) {
                const timer = setTimeout(() => {
                    setError('');
                    setMessage('');
                }, 5000);
                return () => clearTimeout(timer);
            }
        }, [error, message]);

        const inputType = isShowPW ? 'text' : 'password';

        const handleChange = (e) => {
            const { target } = e;
            const { name, value } = target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        };

        const handlePasswordChange = (e) => {
            e.preventDefault();
            setIsLoading(true);
            if (formData.newPassword !== formData.confirmPassword) {
                setError("New password and confirmation do not match.");
                return;
            }

            if (formData.newPassword === '' || formData.confirmPassword === '' || formData.oldPassword === '') {
                setError("All fields are required");
            }

            const data = new FormData();
            data.append('oldPassword', formData.oldPassword.trim());
            data.append('newPassword', formData.newPassword.trim());

            axiosInstance.post('/api/passwordChange', data)
                .then((response) => {
                    setMessage('Password changed successfully');
                })
                .catch((error) => {
                    if(error.response){
                        setError(error?.response?.data?.error);
                    }else{
                        setError('Something went wrong, please try again');
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                });
        };

        const handleEmailChange = (e) => {
            e.preventDefault()

            if(formData.email !== formData.confirmEmail){
                setError("Email and confirmation do not match.");
                return
            }else if(formData.email === '' || formData.confirmEmail === ''){
                setError("All fields are required");
                return
            }else{
                setIsLoading(true)
                const emailData = new FormData();
                emailData.append('email', formData.email.trim());
                emailData.append('confirmEmail', formData.confirmEmail.trim());

                axiosInstance.put('/api/user',formData)
                .then(res=>{
                    console.log(res)
                    setMessage('email changed successfully');
                })
                .catch(err=>{
                    console.log(err.response.data.error)
                    if(err.response){
                        setError(err?.response?.data?.error);
                    }else{
                        setError('Something went wrong, please try again');
                    }
                })
                .finally(()=>{
                    setIsLoading(false)
                })
            }
            
        }

        function generatePassword() {
            let length = Math.floor(16,28)
            // Define character sets
            const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

            // Ensure the password contains at least one character from each set
            let password = '';
            password += letters.charAt(Math.floor(Math.random() * letters.length));
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

            // Fill the remaining length of the password with random characters from all sets
            const allChars = letters + numbers + specialChars;
            for (let i = 3; i < length; i++) {
                password += allChars.charAt(Math.floor(Math.random() * allChars.length));
            }

            // Shuffle the password to avoid predictable patterns
            password = password.split('').sort(() => 0.5 - Math.random()).join('');

            setFormData({
                ...formData,
                newPassword: password,
                confirmPassword: password
            })
        }

        if (isLoading) {
            return <>loading...</>;
        }

        return (
            <>
                {error && <div className="error-block">{error}</div>}
                {message && <div className="message-block">{message}</div>}
                <div className='account-settings'>
                    <div className="settings-card">
                        <h2 className='settings-card__title'>Change Password</h2>
                        <button onClick={() => setIsShowPW(!isShowPW)}>show/hide password</button>
                        <button onClick={generatePassword}>generate password</button>
                        <form onSubmit={handlePasswordChange} className="form-group">
                            <label htmlFor="oldPassword">Current Password</label>
                            <input 
                                name='oldPassword' 
                                onChange={handleChange} 
                                value={formData.oldPassword} 
                                type={inputType} 
                                className="form-control" 
                                id="oldPassword" 
                            />
                            <label htmlFor="newPassword">New Password</label>
                            <input 
                                name='newPassword' 
                                onChange={handleChange} 
                                value={formData.newPassword} 
                                type={inputType} 
                                className="form-control" 
                                id="newPassword" 
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                name='confirmPassword' 
                                onChange={handleChange} 
                                value={formData.confirmPassword} 
                                type={inputType} 
                                className="form-control" 
                                id="confirmPassword" 
                            />
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                    <div className="settings-card">
                        <h2 className='settings-card__title'>Change Email</h2>
                        <form onSubmit={handleEmailChange} className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={handleChange} name='email' value={formData.email} type="email" className="form-control" id="email" />
                            <label htmlFor="confirmEmail">Confirm Email</label>
                            <input onChange={handleChange} name='confirmEmail' value={formData.confirmEmail} type="email" className="form-control" id="confirmEmail" />
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

