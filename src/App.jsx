import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistreForm from './compenents/RegistreForm'
import './index.css'
import LoginForm from './compenents/LoginForm'
import Home from './pages/Home'
import RecipeCard from './compenents/RecipeCard'
import RecipeDetails from './compenents/RecipeDetails'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegistreForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
  )
}

export default App