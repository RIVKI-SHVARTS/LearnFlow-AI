import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import FeedbackMessage from '../components/FeedbackMessage';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const [selectedCatId, setSelectedCatId] = useState('');
    const [newCatName, setNewCatName] = useState('');
    const [subCatName, setSubCatName] = useState('');

    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => {
            setFeedback({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                await api.get('/users/admin');
                fetchData();
            } catch (err) {
                navigate('/dashboard');
            }
        };

        verifyAdmin();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [usersRes, catRes] = await Promise.all([
                api.get('/users/'),
                api.get('/categories/')
            ]);
            setUsers(usersRes.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error("Error fetching data", err);
            showFeedback("Error fetching data", 'error');
        }
    };

    const handleCreateTopic = async () => {
        if (!subCatName) {
            showFeedback("Please enter sub-category name", 'error');
            return;
        }

        let targetCatId = selectedCatId;

        try {
            if (newCatName) {
                const res = await api.post('/categories/', { name: newCatName });
                targetCatId = res.data.id;
            }

            if (!targetCatId) {
                showFeedback("Please select an existing category or enter a new one", 'error');
                return;
            }

            await api.post('/sub-categories/', {
                name: subCatName,
                category_id: targetCatId
            });

            showFeedback('Topic created successfully!', 'success');
            setNewCatName('');
            setSubCatName('');
            setSelectedCatId('');
            fetchData();
        } catch (err) {
            showFeedback("Error creating topic", 'error');
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>

            <section className="admin-section">
                <h3>Add New Learning Topic</h3>

                <div className="form-group">
                    <label>1. Choose Category:</label>
                    <select
                        value={selectedCatId}
                        onChange={(e) => { setSelectedCatId(e.target.value); setNewCatName(''); }}
                        disabled={newCatName !== ''}
                    >
                        <option value="">-- Select Existing --</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>OR Enter New Category:</label>
                    <input
                        value={newCatName}
                        placeholder="New Category Name"
                        onChange={(e) => { setNewCatName(e.target.value); setSelectedCatId(''); }}
                        disabled={selectedCatId !== ''}
                    />
                </div>

                <div className="form-group">
                    <label>2. Sub-Category Name:</label>
                    <input
                        value={subCatName}
                        placeholder="Sub-category name"
                        onChange={(e) => setSubCatName(e.target.value)}
                    />
                </div>

                <button className="create-button" onClick={handleCreateTopic}>
                    Create Topic
                </button>
            </section>

            <section className="admin-section">
                <h2>Registered Users</h2>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.phone}</td>
                                <td>{u.id}</td>
                                <td>
                                    <button onClick={() => navigate(`/user-history/${u.id}`)}>
                                        View History
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <FeedbackMessage message={feedback.message} type={feedback.type} />
        </div>
    );
};

export default AdminPage;