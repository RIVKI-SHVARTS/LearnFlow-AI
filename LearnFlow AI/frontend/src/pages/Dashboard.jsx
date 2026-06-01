import React, { useState } from 'react';
import CategorySelector from './CategorySelector'; // נניח שזה הרכיב שבוחר קטגוריות

const Dashboard = () => {
    const [currentLesson, setCurrentLesson] = useState(null);

    return (
        <div className="dashboard-container" style={styles.dashboard}>
            <h1>Learning Dashboard</h1>
            
            <div style={styles.mainLayout}>
                <div >
                    <CategorySelector onLessonGenerated={(lesson) => setCurrentLesson(lesson)} />
                </div>


            </div>

        </div>
    );
};

const styles = {
    dashboard: { padding: '20px' },
    mainLayout: { display: 'flex', gap: '20px', marginBottom: '30px' },
    leftColumn: { flex: '1' },
    rightColumn: { flex: '2' },
    historySection: { borderTop: '2px solid #eee', paddingTop: '20px' }
};

export default Dashboard;