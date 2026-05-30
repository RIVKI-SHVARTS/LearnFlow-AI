import { useState } from 'react'
import './App.css'
import RegisterForm from './pages/RegistrationForm';
import CategorySelector from './components/CategorySelector';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <RegisterForm /> */}
     < CategorySelector/>
    </div>
  )
}

export default App
