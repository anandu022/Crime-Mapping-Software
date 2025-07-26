import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Admin from '../admin/App'
import GuestHome from '../guest/App'
import Officials from '../officials/App'
import User from '../user/App'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/guest/land" replace />} />
      <Route path='admin/*' element={<Admin/>} />
      <Route path='guest/*' element={<GuestHome/>} />
      <Route path='officials/*' element={<Officials/>} />
      <Route path='user/*' element={<User/>} />
    </Routes>
  )
}

export default MainRoutes