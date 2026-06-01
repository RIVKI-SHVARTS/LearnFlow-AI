



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';

// const AdminPage = () => {
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [prompts, setPrompts] = useState([]);
//     const [categoryName, setCategoryName] = useState('');
//     const [subCatName, setSubCatName] = useState('');

//     useEffect(() => {
//         // בדיקת הרשאות בסיסית
//         const isAdmin = JSON.parse(sessionStorage.getItem('is_admin'));
//         if (!isAdmin) {
//             navigate('/dashboard');
//             return;
//         }
//         fetchData();
//     }, [navigate]);

//     const fetchData = async () => {
//         try {
//             const [usersRes, promptsRes] = await Promise.all([
//                 api.get('/users/'),
//                 api.get('/prompts/')
//             ]);
//             setUsers(usersRes.data);
//             setPrompts(promptsRes.data);
//         } catch (err) {
//             console.error("Error fetching admin data", err);
//         }
//     };
// const handleAddFullHierarchy = async () => {
//     if (!categoryName || !subCatName) return alert("Please fill all fields");

//     try {
//         // 1. הוספת הקטגוריה
//         await api.post('/categories/', { name: categoryName });

//         // 2. שליפת כל הקטגוריות כדי למצוא את ה-ID של זו שהרגע הוספנו
//         const res = await api.get('/categories/');
//         const allCategories = res.data;

//         // מציאת הקטגוריה לפי השם
//         const createdCat = allCategories.find(cat => cat.name === categoryName);

//         if (createdCat) {
//             // 3. הוספת הסאב-קטגוריה עם ה-ID שמצאנו
//             await api.post('/sub-categories/', { 
//                 name: subCatName, 
//                 category_id: createdCat.id // או createdCat._id תלוי איך השרת שלך קורא לזה
//             });
//             alert('Category and Sub-category added successfully!');
//             setCategoryName('');
//             setSubCatName('');
//         } else {
//             alert("Error: Could not find the category ID");
//         }
//     } catch (err) {
//         console.error(err);
//         alert("Error during the process");
//     }
// };

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <h1>Admin Dashboard</h1>

//             {/* ניהול תוכן אוטומטי */}
//             <section style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
//                 <h3>Add New Learning Topic</h3>
//                 <input value={categoryName} placeholder="Category Name" onChange={e => setCategoryName(e.target.value)} />
//                 <input value={subCatName} placeholder="Sub-category Name" onChange={e => setSubCatName(e.target.value)} />
//                 <button onClick={handleAddFullHierarchy}>Create Topic Hierarchy</button>
//             </section>

//             {/* טבלאות נתונים */}
//             <section style={{ marginTop: '30px' }}>
//                 <h2>User System History</h2>
//                 <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr style={{ background: '#ddd' }}>
//                             <th>Name</th><th>Phone</th><th>ID</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(u => (
//                             <tr key={u.id}>
//                                 <td>{u.name}</td><td>{u.phone}</td><td>{u.id}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </section>
//         </div>
//     );
// };

// export default AdminPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const AdminPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    // States עבור ניהול תוכן
    const [selectedCatId, setSelectedCatId] = useState('');
    const [newCatName, setNewCatName] = useState('');
    const [subCatName, setSubCatName] = useState('');

    useEffect(() => {
        const isAdmin = JSON.parse(sessionStorage.getItem('is_admin'));
        if (!isAdmin) {
            navigate('/dashboard');
            return;
        }
        fetchData();
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
        }
    };

    const handleCreateTopic = async () => {
        if (!subCatName) return alert("Please enter sub-category name");

        let targetCatId = selectedCatId;

        try {
            // אם המשתמש הזין שם חדש, ניצור קטגוריה חדשה
            if (newCatName) {
                const res = await api.post('/categories/', { name: newCatName });
                targetCatId = res.data.id;
            }

            if (!targetCatId) return alert("Please select an existing category or enter a new one");

            // יצירת תת-קטגוריה
            await api.post('/sub-categories/', {
                name: subCatName,
                category_id: targetCatId
            });

            alert('Topic created successfully!');
            // ניקוי טפסים
            setNewCatName('');
            setSubCatName('');
            setSelectedCatId('');
            fetchData(); // רענון הנתונים
        } catch (err) {
            alert("Error creating topic");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Admin Dashboard</h1>

            <section style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
                <h3>Add New Learning Topic</h3>

                <div style={{ marginBottom: '10px' }}>
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

                <div style={{ marginBottom: '10px' }}>
                    <label>OR Enter New Category:</label>
                    <input
                        value={newCatName}
                        placeholder="New Category Name"
                        onChange={(e) => { setNewCatName(e.target.value); setSelectedCatId(''); }}
                        disabled={selectedCatId !== ''}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>2. Sub-Category Name:</label>
                    <input
                        value={subCatName}
                        placeholder="Sub-category name"
                        onChange={(e) => setSubCatName(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleCreateTopic}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    Create Topic
                </button>
            </section>

            <section style={{ marginTop: '30px' }}>
                <h2>Registered Users</h2>
                {/* <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#eee' }}>
                            <th>Name</th><th>Phone</th><th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td><td>{u.phone}</td><td>{u.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
 <table border="1" width="100%" style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
    <thead>
        <tr style={{ background: '#ddd' }}>
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
                    {/* הכפתור שמנווט להיסטוריה של המשתמש הספציפי */}
                    <button onClick={() => navigate(`/user-history/${u.id}`)}>
                        View History
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
            </section>
        </div>
    );
};

export default AdminPage;