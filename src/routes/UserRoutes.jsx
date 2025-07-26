import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddCrimeLocation from '../user/pages/addCrime/AddCrimeLocation'
import PreviousCrimes from '../user/pages/previousCrimes/PreviousCrimes'
import Home from '../user/pages/home/Home'
import Profile from '../user/pages/profile/Profile'
import EditProfile from '../user/pages/editProfile/EditProfile'
import ChangePassword from '../user/pages/changePassword/ChangePassword'
import CrimeDetails from '../user/pages/crimeDetails/CrimeDetails'
import ShowMap from '../user/pages/showmap/ShowMap'
import ShowDetails from '../user/pages/showdetails/ShowDetails'
import ShowMapTable from '../user/pages/showmaptable/ShowMapTable'
import Notification from '../user/pages/notification/Notification'
import ChangePhoto from '../user/pages/changePhoto/ChangePhoto'


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/addcrime" replace />} />
      <Route path='addcrime' element={<AddCrimeLocation/>} />
      <Route path='listcrime' element={<PreviousCrimes/>} />
      <Route path='home' element={<Home/>} />
      <Route path='profile' element={<Profile/>} />
      <Route path='editprofile' element={<EditProfile/>} />
      <Route path='changepassword' element={<ChangePassword/>} />
      <Route path='crimedetails' element={<CrimeDetails/>} />
      
      <Route path='showmap' element={<ShowMap/>} />
      <Route path='notification' element={<Notification/>} />

      <Route path='viewcrime-details/:id' element={<ShowDetails/>} />
      <Route path='showmaptable/:id' element={<ShowMapTable />} />
      <Route path='changephoto' element={<ChangePhoto />} />
    </Routes>
  )
}

export default UserRoutes