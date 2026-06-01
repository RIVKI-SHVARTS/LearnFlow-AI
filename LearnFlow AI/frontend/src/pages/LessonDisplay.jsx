
import React from 'react';
import '../styles/LessonDisplay.css';
import ReactMarkdown from 'react-markdown';  

const LessonDisplay = () => {
  const lesson = localStorage.getItem('current_lesson');

  if (!lesson) {
    return (
      <div className="no-lesson">
        <p>No lesson found. Please go back to the home page to generate one.</p>
        <button onClick={() => window.location.href = '/dashboard'}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <h1>Your Lesson</h1>
      <div className="lesson-content">
        {/* {lesson} */}
        <ReactMarkdown>
          {lesson}
        </ReactMarkdown>
      </div>
      <button onClick={() => window.location.href = '/dashboard'}>Back</button>
    </div>
  );
};

export default LessonDisplay;