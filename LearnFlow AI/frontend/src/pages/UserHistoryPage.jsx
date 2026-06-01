
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import FeedbackMessage from '../components/FeedbackMessage';
import '../styles/UserHistoryPage.css';
import ReactMarkdown from 'react-markdown'; 

const UserHistoryPage = () => {
    const { userId } = useParams();
    const [history, setHistory] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [username, setUsername] = useState('Loading...');
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => {
            setFeedback({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        api.get(`/prompts/history/${userId}`)
            .then(res => setHistory(res.data))
            .catch(err => {
                console.error("Error fetching user history:", err);
                showFeedback("Error fetching history", 'error');
            });
    }, [userId]);

    useEffect(() => {
        api.get(`/users/${userId}`)
            .then(res => setUsername(res.data.name))
            .catch(err => {
                console.error("Error fetching user info:", err);
                showFeedback("Error fetching user info", 'error');
            });
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/prompts/${id}`);
            setHistory(prev => prev.filter(item => (item.id || item._id) !== id));
            setDeleteConfirm(null);
            showFeedback('Lesson deleted successfully', 'success');
        } catch (err) {
            showFeedback("Failed to delete lesson", 'error');
        }
    };

    return (
        <div className="user-history-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back to Admin</button>
            <h1>{username}'s Learning History</h1>
            
            {history.length > 0 ? (
                history.map((item) => {
                    const itemId = item.id || item._id;
                    return (
                        <div key={itemId} className="user-history-card">
                            <div className="history-header">
                                <h3>Topic: {item.prompt}</h3>
                                <div>
                                    <button onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}>
                                        {expandedId === itemId ? 'Close' : 'View Full Lesson'}
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
                                    <button onClick={() => setDeleteConfirm(null)} className="cancel-button">
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
                    <p>This user has no learning history yet.</p>
                </div>
            )}
            <FeedbackMessage message={feedback.message} type={feedback.type} />
        </div>
    );
};

export default UserHistoryPage;