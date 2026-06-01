
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import FeedbackMessage from '../components/FeedbackMessage';
import '../styles/HistoryPage.css';
import ReactMarkdown from 'react-markdown'; 


const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [userName, setUserName] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => {
            setFeedback({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('user_id');
        const name = sessionStorage.getItem('user_name')
        setUserName(`${name}'s` || '');


        api.get(`/prompts/history/${userId}`)
            .then(res => {
                setHistory(res.data);
            })
            .catch(err => {
                console.error("Error fetching history:", err);
                showFeedback("Error fetching history", 'error');
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/prompts/${id}`);
            setHistory(prev => prev.filter(item => item.id !== id && item._id !== id));
            setDeleteConfirm(null);
            showFeedback('Lesson deleted successfully', 'success');
        } catch (err) {
            console.error("Delete error:", err);
            showFeedback("Failed to delete lesson", 'error');
        }
    };

    return (
        <div className="history-page">
            <h1>{userName} Learning History</h1>
            {history.length > 0 ? (
                history.map((item) => {
                    const itemId = item._id || item.id;

                    return (
                        <div key={itemId} className="history-card">
                            <div className="history-header">
                                <h3>Topic: {item.prompt}</h3>
                                <div>
                                    <button onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}>
                                        {expandedId === itemId ? 'Close' : 'View Full'}
                                    </button>
                                    <button 
                                        className="delete"
                                        onClick={() => setDeleteConfirm(itemId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {deleteConfirm === itemId && (
                                <div className="history-content">
                                    <p>Are you sure you want to delete this lesson?</p>
                                    <button onClick={() => handleDelete(itemId)} className="confirm-button">
                                        Confirm Delete
                                    </button>
                                    <button className="cancel-button" onClick={() => setDeleteConfirm(null)}>
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {expandedId === itemId && deleteConfirm !== itemId && (
                                <div className="history-content">
                                    <ReactMarkdown>
                                        {item.response}
                                    </ReactMarkdown>
                                    <small>Date: {new Date(item.created_at).toLocaleDateString()}</small>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="no-history">
                    <p>No history found yet.</p>
                </div>
            )}
            <FeedbackMessage message={feedback.message} type={feedback.type} />
        </div>
    );
};

export default HistoryPage;