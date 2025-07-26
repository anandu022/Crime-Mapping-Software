import React from 'react'
import AdminRoutes from '../routes/AdminRoutes'
import { DarkModeContextProvider } from './context/darkModeContext'
import Sidebar from './componets/sidebar/Sidebar'

const Admin = () => {
  return (
    <div>
      <DarkModeContextProvider>
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <AdminRoutes />
          </div>
        </div>
      </DarkModeContextProvider>

    </div>
  )
}

export default Admin