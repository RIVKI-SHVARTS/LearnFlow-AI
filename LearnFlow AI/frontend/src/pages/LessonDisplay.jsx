
import React from 'react';

const LessonDisplay = () => {
  const lesson = localStorage.getItem('current_lesson');

  if (!lesson) {
    return (
      <div style={{ padding: '20px' }}>
        <p>No lesson found. Please go back to the home page to generate one.</p>
        <button onClick={() => window.location.href = '/dashboard'}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="lesson-page" style={{ padding: '20px' }}>
      <h1>Your Lesson</h1>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
        {lesson}
      </div>
      <button onClick={() => window.location.href = '/dashboard'}>Back</button>
    </div>
  );
};

export default LessonDisplay;