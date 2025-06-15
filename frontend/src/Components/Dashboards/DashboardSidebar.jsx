import React from 'react'
import { BarChart3, LayoutDashboard, LifeBuoy, LogOut, Settings, UserCircle, Users } from "lucide-react"
import { Button } from '../ui/button'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { Link } from 'react-router-dom'


const DashboardSidebar = () => {

    const { logout, User } = useContext(AuthContext)

    return (
        <div className='flex flex-col h-dvh border-black lg:w-[300px] w-[150px]'>
            <div className='flex items-center lg:p-4.5 p-4 border-b  border-r gap-2'>
                <div><LayoutDashboard lg:size={32} /></div>
                <div className='font-bold lg:text-xl'>{User?.role === 'admin' ? 'Admin' : "User"} Portal</div>
            </div>
            <div className='p-5 h-full'>
                <ul className='flex flex-col gap-5'>
                    {
                        User?.role === 'admin' ? (
                            <>
                                <li className='flex items-center gap-2'>
                                    <span><LayoutDashboard size={24} /></span>
                                    <span className='font-bold'>Dashboard</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span><Users size={24} /></span>
                                    <span className='font-bold'>Users</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span><BarChart3 size={24} /></span>
                                    <span className='font-bold'>Analytics</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span><Settings size={24} /></span>
                                    <span className='font-bold'>Settings</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='flex items-center gap-2'>
                                    <span><LayoutDashboard size={24} /></span>
                                    <span className='font-bold'>Dashboard</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span><UserCircle size={24} /></span>
                                    <Link to='Profile'><span className='font-bold'>Profile</span></Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className='w-full mb-5 p-5 h-full  flex items-end'>

                <Button onClick={() => { logout() }} className='lg:w-[250px] flex justify-start'>
                    <LogOut />
                    Logout
                </Button>
            </div>

        </div>
    )
}

export default DashboardSidebar
