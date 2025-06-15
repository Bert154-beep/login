import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import { Label } from '../ui/label'
import { Calendar, FileText, MessageSquare, Bell, Users, Server, BarChart3, Activity } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

const AdminDashboard = () => {

  const {User} = useContext(AuthContext)

  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar />

      <div className='flex flex-col flex-1'>
        <DashboardHeader />

        <div className="p-4 border-l w-full  h-full">
          <div className='flex flex-col p-5'>
            <span className='font-extrabold text-3xl'>Admin Dashboard</span>
            <span className='text-sm text-gray-400'>Welcome Back, {User?.Username}. Here's an overview of your system.</span>
          </div>
          <div className='ml-5'>
            <ul className='flex gap-4'>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Total Users</Label>
                  <Users size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>12,345</p>
                <p className='text-sm text-gray-400'>Active accounts</p>
                <p className='text-sm mt-1'><span className='text-green-400'>+12%</span> from last month</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Server Uptime</Label>
                  <Server size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>99.9%</p>
                <p className='text-sm text-gray-400'>Last 30 Days</p>
                <p className='text-sm mt-1'><span className='text-green-400'>+0.2%</span> from last month</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Active Sessionss</Label>
                  <Activity size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>1,234</p>
                <p className='text-sm text-gray-400'>Current Users</p>
                <p className='text-sm mt-1'><span className='text-red-400'>-3%</span> from last month</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Total Revenue</Label>
                  <BarChart3 size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>$45,231</p>
                <p className='text-sm text-gray-400'>Year to Date</p>
                <p className='text-sm mt-1'><span className='text-green-400'>+8%</span> from last month</p>
              </li>
            </ul>
          </div>
          <div className='flex items-center p-3 ml-3 gap-8'>
            <div className='h-[300px] w-[500px] border-2 rounded-2xl'>
              <div className='p-5'><p className='font-bold text-3xl'>System Health</p></div>
              <div className='p-5'>
                <ul className='flex flex-col gap-4'>
                  <li className='flex flex-col gap-2'>
                    <div className='flex justify-between '>
                      <Label className='font-semibold text-sm'>CPU Usage</Label>
                      <span className='text-sm'>24%</span>
                    </div>
                    <Progress value={24} />
                  </li>
                  <li className='flex flex-col gap-2'>
                    <div className='flex justify-between '>
                      <Label className='font-semibold text-sm'>Memory Usage</Label>
                      <span className='text-sm'>62%</span>
                    </div>
                    <Progress value={62} />
                  </li>
                  <li className='flex flex-col gap-2'>
                    <div className='flex justify-between '>
                      <Label className='font-semibold text-sm'>Disk Usage</Label>
                      <span className='text-sm'>87%</span>
                    </div>
                    <Progress value={87} />
                  </li>
                </ul>
              </div>
            </div>
            <div className='h-[300px] w-[500px] border-2 rounded-2xl'>
              <div className='p-5'><p className='font-bold text-3xl'>Recent Activities</p></div>
              <div className='ml-5'>
                <ul className='flex flex-col gap-5'>
                  <li className='flex items-center gap-4'>
                    <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><Users /></div>
                    <div className='flex flex-col'>
                      <span className='text-xl font-bold'>New User Registered</span>
                      <span className='text-xs text-gray-400'>2 Minutes Ago</span>
                    </div>
                  </li>
                  <li className='flex items-center gap-4'>
                    <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><Server /></div>
                    <div className='flex flex-col'>
                      <span className='text-xl font-bold'>Server maintenance completed</span>
                      <span className='text-xs text-gray-400'>45 Minutes ago</span>
                    </div>
                  </li>
                  <li className='flex items-center gap-4'>
                    <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><Activity /></div>
                    <div className='flex flex-col'>
                      <span className='text-xl font-bold'>Traffic spike detected</span>
                      <span className='text-xs text-gray-400'>3 hours ago</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard