import React from 'react';

const FeedbackMessage = ({ message, type }) => {
  if (!message) return null;
  
  const styles = {
    padding: '10px',
    marginTop: '10px',
    borderRadius: '4px',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    color: type === 'success' ? '#155724' : '#721c24',
    border: `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
  };

  return <div style={styles}>{message}</div>;
};

export default FeedbackMessage;