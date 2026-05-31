import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './pages/RegistrationForm';
import CategorySelector from './pages/CategorySelector';
import LessonDisplay from './pages/LessonDisplay';  

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* הדף הראשי שבו בוחרים קטגוריה ויוצרים שיעור */}
          <Route path="/" element={<CategorySelector />} />
          
          {/* דף הצגת השיעור שנפתח אחרי יצירה */}
          <Route path="/lesson" element={<LessonDisplay />} />
          
          {/* אפשר להוסיף כאן עוד דפים בעתיד */}
          {/* <Route path="/register" element={<RegisterForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;