import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import CrimeList from '../officials/pages/crimelist/Crimelist'
import ShowMap from '../officials/pages/showmap/ShowMap'
import LandOff from '../officials/pages/landOff/landOff'
import ViewProfile from '../officials/pages/viewProfile/ViewProfile'
import NewPass from '../officials/pages/newPass/NewPass'
import Editprof from '../officials/pages/editprof/Editprof'
import UserDetails from '../officials/pages/userDetails/UserDetails'

const OfficialsRoutes = () => {
  return (
    <div><Routes>
    <Route path='crimelist' element={<CrimeList />} />
    <Route path='showmap/:id' element={<ShowMap />} />
    <Route path='landoff' element={<LandOff />} />
    <Route path='profile' element={<ViewProfile />} />
    <Route path='newpass' element={<NewPass />} />
    <Route path='editprof' element={<Editprof />} />
    <Route path="user-details/:userId" element={<UserDetails />} />
    <Route path="/" element={<Navigate to="/officials/landoff" replace />} />
</Routes></div>
  )
}

export default OfficialsRoutes