import React, { useState } from 'react'
import UserRoutes from '../routes/UserRoutes'
import Sidebar from './components/sidebar/Sidebar'
import './App.css'; 
import { Button } from '@mui/material';
import CollapseButton from './components/collapseButton/CollapseButton';

const User = () => {
  

  return (
    <div className="app-container">
      
      <div>
      
        <Sidebar />
      </div>
      <div className="main-content">
        
        <UserRoutes />
      </div>
    </div>
  )
}

export default User