import React from 'react'
import User_Header from '../components/User_Header'
import { Outlet } from 'react-router-dom'
import User_Footer from './../components/User_Footer';

function MainLayout() {
  return (
    <div>
          <User_Header />
          <Outlet />
          <User_Footer />
    </div>
  )
}

export default MainLayout
