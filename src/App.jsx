import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistreForm from './compenents/RegistreForm'
import './index.css'
import LoginForm from './compenents/LoginForm'

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegistreForm />} />
      </Routes>
  )
}

export default App