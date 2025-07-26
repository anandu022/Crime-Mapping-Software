import React from 'react'
import GuestRoutes from '../routes/GuestRoutes'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const GuestHome = () => {
  return (
    <div >
      <Navbar/>
      <div style={{ paddingTop: '80px' }}>
      <GuestRoutes/>
      </div>
      
    </div>
  )
}

export default GuestHome