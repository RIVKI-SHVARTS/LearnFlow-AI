

import React, { useEffect, useState } from 'react';
import api from '../api/api';


const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [userName, setUserName] = useState(''); 


    useEffect(() => {
        const userId = sessionStorage.getItem('user_id');
        const name = sessionStorage.getItem('user_name')
        setUserName(`${name}'s` || '');


        api.get(`/prompts/history/${userId}`)
            .then(res => {
                setHistory(res.data);
            })
            .catch(err => console.error("Error fetching history:", err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;

        try {
            // וודאי שהשרת באמת מוחק לפי ה-ID הזה
            await api.delete(`/prompts/${id}`);
            // נעדכן את ה-State כך שהאייטם יוסר מהרשימה
            setHistory(prev => prev.filter(item => item.id !== id && item._id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete lesson. Check console.");
        }
    };

    return (
        <div className="history-page" style={{ padding: '20px' }}>
            <h1>{userName} Learning History</h1>
            {history.length > 0 ? (
                history.map((item) => {
                    // הגדרה בטוחה ל-ID (לוקח _id אם קיים, אם לא אז id)
                    const itemId = item._id || item.id;

                    return (
                        <div key={itemId} style={styles.card}>
                            <div style={styles.header}>
                                <h3>Topic: {item.prompt}</h3>
                                <div>
                                    <button onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}>
                                        {expandedId === itemId ? 'Close' : 'View Full'}
                                    </button>
                                    <button onClick={() => handleDelete(itemId)} style={{ color: 'red', marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* פתיחה רק של הפריט שזוהה כ-expandedId */}
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
                <p>No history found yet.</p>
            )}
        </div>
    );
};


const styles = {
    card: { border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    content: { marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }
};

export default HistoryPage;