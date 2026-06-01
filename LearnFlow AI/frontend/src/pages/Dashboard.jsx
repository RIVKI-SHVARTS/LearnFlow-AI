import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [currentLesson, setCurrentLesson] = useState(null);

    return (
        <div className="dashboard-container">
            <h1>Learning Dashboard</h1>
            
            <div className="main-layout">
                <div className="left-column">
                    <CategorySelector onLessonGenerated={(lesson) => setCurrentLesson(lesson)} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;