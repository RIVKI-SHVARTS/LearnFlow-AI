import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './pages/RegistrationForm';
import CategorySelector from './pages/CategorySelector';
import LessonDisplay from './pages/LessonDisplay';  
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<LoginPage />} />    

          {/* הדף הראשי שבו בוחרים קטגוריה ויוצרים שיעור */}
          <Route path="/category" element={<CategorySelector />} />
          
          {/* דף הצגת השיעור שנפתח אחרי יצירה */}
          <Route path="/lesson" element={<LessonDisplay />} />

          <Route path="/history" element={<HistoryPage />} />
          
          {/* אפשר להוסיף כאן עוד דפים בעתיד */}
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;