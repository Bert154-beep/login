import React from 'react'
import { Input } from '../ui/input'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

const DashboardHeader = () => {

    const { User } = useContext(AuthContext)
    console.log(User)

    return (
        <div className='w-full border-b'>
            <div className='lg:p-3.5 p-4 flex items-center w-full justify-between'>
                <Input placeholder='Search...' className='lg:w-[300px] w-[150px]' />
                <div className='flex items-center lg:gap-3 gap-4'>
                    <Bell lg:size={24} size={20} />
                    <span className='lg:text-xl text-xs font-bold'>{User?.Username} {User?.role === 'admin' ? "Admin" : "User"}</span>
                    <Button className='h-[25px] w-[50px] rounded-3xl'>{User?.role === 'admin' ? "Admin" : "User"}</Button>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
