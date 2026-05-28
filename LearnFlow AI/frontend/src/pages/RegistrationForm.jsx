import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api/api';
import { doSetUser } from '../store/Actions';
import FeedbackMessage from '../components/FeedbackMessage';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', formData);
      dispatch(doSetUser(response.data));
      
      // Success
      setFeedback({ message: 'Registration successful! Welcome.', type: 'success' });
      setFormData({ name: '', phone: '' });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
      }, 3000);

    } catch (error) {
      // Error
    let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // השרת הגיב עם קוד שגיאה (כמו 409)
        if (error.response.status === 409) {
          errorMessage = 'This phone number is already registered.';
        } else if (error.response.data && error.response.data.message) {
          // אם השרת שלח הודעה ספציפית ב-JSON
          errorMessage = error.response.data.message;
        }
      }

      setFeedback({ message: errorMessage, type: 'error' });      
      // Auto-clear error message after 3 seconds
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
      }, 3000);
    }
  };

  return (
    <div className="register-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name:</label>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        
        <label>Phone:</label>
        <input 
          type="text" 
          placeholder="Enter your phone" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
        />
        
        <button type="submit">Register</button>
      </form>

      {/* Feedback area */}
      <FeedbackMessage message={feedback.message} type={feedback.type} />
    </div>
  );
};

export default RegisterForm;