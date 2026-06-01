import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import RegisterForm from './pages/RegistrationForm';
import CategorySelector from './pages/CategorySelector';
import LessonDisplay from './pages/LessonDisplay';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import UserHistoryPage from './pages/UserHistoryPage';
import AdminPage from './pages/AdminPage';


function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/category" element={<CategorySelector />} />
        <Route path="/lesson" element={<LessonDisplay />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user-history/:userId" element={<UserHistoryPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;