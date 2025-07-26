import React from 'react'
import User from '../guest/pages/user/User'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../guest/pages/login/Login'
import CrimeRadar from '../guest/pages/landingPage/LandingPage'

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path='user' element={<User />} />
      <Route path='login' element={<Login />} />
      <Route path='land' element={<CrimeRadar />} />
      <Route path="/" element={<Navigate to="/guest/land" replace />} />
    </Routes>
  )
}

export default GuestRoutes