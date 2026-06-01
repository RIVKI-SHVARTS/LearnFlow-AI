
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    
    const userName = sessionStorage.getItem('user_name');

    useEffect(() => {
        const adminStatus = JSON.parse(sessionStorage.getItem('is_admin'));
        setIsAdmin(adminStatus === true);
    }, []);

    const handleLogout = () => {
        // ניקוי מלא של כל הנתונים לפני היציאה למניעת באגים
        sessionStorage.clear();
        localStorage.clear();
        
        // ניווט לדף ההתחברות
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">LearnFlow</div>
            
            {userName && (
                <div className="greeting">
                    Hello, {userName}
                </div>
            )}

            <div className="nav-links">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/history" className="nav-link">History</Link>

                {isAdmin && (
                    <Link to="/admin" className="nav-link admin-link">
                        Admin Panel
                    </Link>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;