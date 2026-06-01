// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../api/api';

// const UserHistoryPage = () => {
//     const { userId } = useParams();
//     const [history, setHistory] = useState([]);

//     useEffect(() => {
//         // משיכת הפרומפטים של משתמש ספציפי
//         api.get(`/prompts/history/${userId}`).then(res => setHistory(res.data));
//     }, [userId]);

//     return (
//         <div>
//             <h2>Learning History for User</h2>
//             <table>
//                 {history.map(item => (
//                     <tr key={item.id}>
//                         <td>{item.prompt}</td>
//                         <td>{item.response}</td>
//                     </tr>
//                 ))}
//             </table>
//         </div>
//     );
// };

// export default UserHistoryPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const UserHistoryPage = () => {
    const { userId } = useParams();
    const [history, setHistory] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // משיכת הפרומפטים של משתמש ספציפי
        api.get(`/prompts/history/${userId}`)
            .then(res => setHistory(res.data))
            .catch(err => console.error("Error fetching user history:", err));
    }, [userId]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;
        try {
            await api.delete(`/prompts/${id}`);
            setHistory(prev => prev.filter(item => (item.id || item._id) !== id));
        } catch (err) {
            alert("Failed to delete lesson.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Back to Admin</button>
            <h1>User Learning History</h1>
            
            {history.length > 0 ? (
                history.map((item) => {
                    const itemId = item.id || item._id;
                    return (
                        <div key={itemId} style={styles.card}>
                            <div style={styles.header}>
                                <h3>Topic: {item.prompt}</h3>
                                <div>
                                    <button onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}>
                                        {expandedId === itemId ? 'Close' : 'View Full Lesson'}
                                    </button>
                                    <button onClick={() => handleDelete(itemId)} style={{ color: 'red', marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {expandedId === itemId && (
                                <div style={styles.content}>
                                    <p>{item.response}</p>
                                    <small>Date: {new Date(item.created_at).toLocaleDateString()}</small>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>This user has no learning history yet.</p>
            )}
        </div>
    );
};

const styles = {
    card: { border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px', backgroundColor: '#fff' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    content: { marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee', whiteSpace: 'pre-wrap' }
};

export default UserHistoryPage;