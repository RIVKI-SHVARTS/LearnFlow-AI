
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import FeedbackMessage from '../components/FeedbackMessage';

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
            const res = await api.get(`/users/phone/${phone}`);
            const user = res.data;

            if (!user) {
                showFeedback("This phone number does not exist in the system.", 'error');
                return;
            }

            if (user.name !== name) {
                showFeedback("The username does not match the phone number provided.", 'error');
                return;
            }

            sessionStorage.setItem('user_id', user._id);
            navigate('/dashboard');

        } catch (err) {
            const msg = err.response?.data?.message || "Login failed. Please try again.";
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
            
            <div className="register-link" style={{ marginTop: '15px' }}>
                <p>Don't have an account yet? 
                    <Link to="/register" style={{ marginLeft: '5px', color: 'blue' }}>
                        Create a new account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;