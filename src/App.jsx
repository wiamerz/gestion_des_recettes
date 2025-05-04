import React, {useState} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegistreForm from './compenents/RegistreForm'
import './index.css'
import LoginForm from './compenents/LoginForm'
import Home from './pages/Home'
import RecipeDetails from './compenents/RecipeDetails'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}  />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<RegistreForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails isLoggedIn={isLoggedIn} />} />
      </Routes>
  )
}

export default App