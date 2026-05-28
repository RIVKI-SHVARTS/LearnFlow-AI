import { useState } from 'react'
import './App.css'
import RegisterForm from './pages/RegistrationForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default App
