import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


const PromptInput = ({ selectedCategoryId, selectedSubCategoryId }) => {
    const [topic, setTopic] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();




    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem('user_id');

        setLoading(true);

        console.log("Sending payload:", {
            user_id: userId,
            category_id: selectedCategoryId,
            sub_category_id: selectedSubCategoryId,
            topic: topic
        });

        try {
            const res = await api.post('/prompts/generate', {
                user_id: userId,
                category_id: selectedCategoryId,
                sub_category_id: selectedSubCategoryId,
                topic: topic
            });

            console.log("API response:", res.data);
            localStorage.setItem('current_lesson', res.data.response);
            navigate('/lesson')
        } catch (err) {
            console.error("Error generating lesson:", err.response?.data || err.message);
            alert("Failed to generate lesson: " + (err.response?.data?.error || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prompt-input-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="What would you like to learn about?"
                    required
                />
                <button type="submit" disabled={loading || !selectedCategoryId || !selectedSubCategoryId}>
                    {loading ? 'Generating...' : 'Get Lesson'}
                </button>
            </form>

            {response && (
                <div className="ai-response">
                    <h3>Lesson:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default PromptInput;


// import React, { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';

// const PromptInput = ({ selectedCategoryId, selectedSubCategoryId }) => {
//     const [topic, setTopic] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const userId = sessionStorage.getItem('user_id');
//         setLoading(true);

//         try {
//             const res = await api.post('/prompts/generate', {
//                 user_id: userId,
//                 category_id: selectedCategoryId,
//                 sub_category_id: selectedSubCategoryId,
//                 topic: topic
//             });

//             // העברה לדף השיעור עם נתוני השיעור ב-state
//             navigate('/lesson', { state: { lesson: res.data } });
//         } catch (err) {
//             alert("Failed to generate lesson: " + (err.response?.data?.error || "Unknown error"));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="prompt-form">
//             <textarea
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="What would you like to learn about?"
//                 required
//             />
//             <button type="submit" disabled={loading || !selectedCategoryId || !selectedSubCategoryId}>
//                 {loading ? 'Generating...' : 'Get Lesson'}
//             </button>
//         </form>
//     );
// };

// export default PromptInput;