import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import FeedbackMessage from '../components/FeedbackMessage';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => {
            setFeedback({ message: '', type: '' });
        }, 3000);
    };

    const validatePhone = (phone) => /^[0-9]{9,10}$/.test(phone);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validatePhone(phone)) {
            showFeedback("Invalid phone number. Please enter 9-10 digits only.", 'error');
            return;
        }

        try {
            const res = await api.post('/users/login', { phone, name });
            const user = res.data;

            sessionStorage.setItem('auth_token', user.token);
            sessionStorage.setItem('user_id', user.user_id);
            sessionStorage.setItem('user_name', user.name);
            sessionStorage.setItem('is_admin', user.is_admin);
            navigate('/dashboard');

        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.message || "Login failed. Please try again.";
            showFeedback(msg, 'error');
        }
    };

    return (
        <div className="login-container">
            <h2>Login to LearnFlow</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="tel" 
                    placeholder="Phone (digits only)" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} 
                    required 
                />
                <button type="submit">Enter</button>
            </form>

            <FeedbackMessage message={feedback.message} type={feedback.type} />
            
            <div className="register-link">
                <p>Don't have an account yet? 
                    <Link to="/register">
                        Create a new account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;