// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         sessionStorage.clear(); 
//         localStorage.clear();  
        
//         navigate('/');
//     };

//     return (
//         <nav className="navbar" style={styles.nav}>
//             <div className="logo">LearnFlow</div>
//             <div className="nav-links">
//                 <Link to="/dashboard" style={styles.link}>Dashboard</Link>
//                 <Link to="/history" style={styles.link}>History</Link>
//                 <button onClick={handleLogout} style={styles.button}>Logout</button>
//             </div>
//         </nav>
//     );
// };

// const styles = {
//     nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' },
//     link: { margin: '0 10px', textDecoration: 'none', color: '#333' },
//     button: { cursor: 'pointer', background: 'none', border: 'none', color: 'red', fontWeight: 'bold' }
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
        <nav className="navbar" style={styles.nav}>
            <div className="logo" style={styles.logo}>LearnFlow</div>
            
            {/* הצגת ברכת שלום אישית אם המשתמש מחובר */}
            {userName && (
                <div style={styles.greeting}>
                    Hello, {userName}
                </div>
            )}

            <div className="nav-links">
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/history" style={styles.link}>History</Link>

                {isAdmin && (
                    <Link to="/admin" style={{...styles.link, fontWeight: 'bold'}}>
                        Admin Panel
                    </Link>
                )}
                <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
        </nav>
    );
};

const styles = {
    nav: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', // יישור אנכי
        padding: '1rem', 
        background: '#f8f9fa', 
        borderBottom: '1px solid #ddd' 
    },
    logo: { fontWeight: 'bold', fontSize: '1.2rem' },
    greeting: { fontSize: '0.9rem', color: '#555', fontWeight: 'bold' },
    link: { margin: '0 10px', textDecoration: 'none', color: '#333' },
    button: { 
        cursor: 'pointer', 
        background: 'none', 
        border: 'none', 
        color: 'red', 
        fontWeight: 'bold',
        marginLeft: '10px'
    }
};

export default Navbar;