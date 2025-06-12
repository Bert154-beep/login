import React from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@/Context/ProtectedRoute'

const AdminLayout = () => {
  return (
    <div>
        <ProtectedRoute allowedRoles={['admin']}>
            <Outlet/>
        </ProtectedRoute>
    </div>
  )
}

export default AdminLayout