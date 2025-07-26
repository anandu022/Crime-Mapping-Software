import React from 'react'
import Category from '../admin/pages/category/Category'
import Home from '../admin/pages/home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import User from '../admin/pages/users/Users'
import NewOfficials from '../admin/pages/newOfficials/NewOfficials'
import ViewCrime from '../admin/pages/viewCrime/ViewCrime'
import ViewProfile from '../admin/pages/viewProfile/ViewProfile'
import Changepass from '../admin/pages/changepass/Changepass'
import Officiallist from '../admin/pages/officiallist/Officiallist'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='users' element={<User/>} />
      <Route path='category' element={<Category/>} />
      <Route path='viewcrime' element={<ViewCrime/>} />
      <Route path='viewprofile' element={<ViewProfile/>} />
      <Route path='home' element={<Home/>} />
      <Route path='changepass' element={<Changepass/>} />
      <Route path='newoff' element={<NewOfficials/>} />
      <Route path='listofficials' element={<Officiallist/>} />
      <Route path="/" element={<Navigate to="/admin/home" replace />} />
    </Routes>
  )
}

export default AdminRoutes

