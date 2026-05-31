import React, { useEffect, useState } from 'react';
import api from '../api/api';


sessionStorage.setItem('user_id', '6a14aad703c777a45deefa07');

const HistoryPage = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('user_id');
        api.get(`/prompts/history/${userId}`)
            .then(res => {
                console.log("SERVER RESPONSE:", res.data);
                setHistory(res.data)
            })




            .catch(err => console.error("Error fetching history:", err));
    }, []);

    return (
        <div className="history-page">
            <h1>Learning History</h1>
            {/* נוסיף בדיקה שהמערך באמת קיים */}
            {history && history.length > 0 ? (
                history.map((item, index) => (
                    <div key={index} className="history-item" style={{
                        border: '1px solid #ccc', margin: '10px', maxHeight: '150px',
                        overflowY: 'auto',
                        border: '1px solid #eee',
                        padding: '5px'
                    }}>
                        {/* השם המדויק לפי ה-Console הוא item.prompt */}
                        <h3>Topic: {item.prompt}</h3>

                        {/* השם המדויק לפי ה-Console הוא item.response */}
                        <p>{item.response ? item.response : "No content"}...</p>

                        {/* השם המדויק לפי ה-Console הוא item.created_at */}
                        <small>{new Date(item.created_at).toLocaleDateString()}</small>
                    </div>
                ))
            ) : (
                <p>No history found yet.</p>
            )}
        </div>
    );
};

export default HistoryPage;