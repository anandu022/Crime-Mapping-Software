import React from 'react'
import Navbar from './components/navbar/Navbar'
import OfficialsRoutes from '../routes/OfficialsRoutes'

const Officials = () => {
  return (
    <div><Navbar className="navv"/>
    <div style={{ paddingTop: '80px' }}>
        <OfficialsRoutes />
      </div>
    </div>
    
  )
}

export default Officials