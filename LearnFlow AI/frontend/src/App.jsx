// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';
// import RegisterForm from './pages/RegistrationForm';
// import CategorySelector from './pages/CategorySelector';
// import LessonDisplay from './pages/LessonDisplay';
// import HistoryPage from './pages/HistoryPage';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import Navbar from './components/Navbar';

// function App() {

//   const location = useLocation();

//   const hideNavbarPaths = ['/', '/register'];

//   const showNavbar = !hideNavbarPaths.includes(location.pathname);
//   return (
//     <Router>
//       <div className="App">
//         {showNavbar && <Navbar />}    
//             <Routes>

//           <Route path="/" element={<LoginPage />} />

//           {/* הדף הראשי שבו בוחרים קטגוריה ויוצרים שיעור */}
//           <Route path="/category" element={<CategorySelector />} />

//           {/* דף הצגת השיעור שנפתח אחרי יצירה */}
//           <Route path="/lesson" element={<LessonDisplay />} />

//           <Route path="/history" element={<HistoryPage />} />

//           {/* אפשר להוסיף כאן עוד דפים בעתיד */}
//           <Route path="/register" element={<RegisterForm />} />

//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






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
// קומפוננטה פנימית שמשתמשת ב-useLocation
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

// הקומפוננטה הראשית שמגדירה את ה-Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;