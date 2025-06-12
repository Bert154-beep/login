import React from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@/Context/ProtectedRoute'

const UserLayout = () => {
  return (
    <div>
        <ProtectedRoute allowedRoles={['user']}>
            <Outlet/>
        </ProtectedRoute>
    </div>
  )
}

export default UserLayout