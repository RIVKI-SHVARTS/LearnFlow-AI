import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        navigate('/');
    };

    return (
        <nav className="navbar" style={styles.nav}>
            <div className="logo">LearnFlow</div>
            <div className="nav-links">
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/history" style={styles.link}>History</Link>
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
        </nav>
    );
};

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' },
    link: { margin: '0 10px', textDecoration: 'none', color: '#333' },
    button: { cursor: 'pointer', background: 'none', border: 'none', color: 'red' }
};

export default Navbar;