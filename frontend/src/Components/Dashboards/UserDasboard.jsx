import React from 'react'
import { Calendar, FileText, MessageSquare, Bell } from "lucide-react"
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'

const UserDashboard = () => {

  const {User} = useContext(AuthContext)

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />

      <div className="flex flex-col flex-1">
        <DashboardHeader />

        <div className="p-4 border-l w-full  h-full">
          <div className='flex flex-col p-5'>
            <span className='font-extrabold text-3xl'>Welcome Back, {User?.Username}!</span>
            <span className='text-sm text-gray-400'>Here's a summary of your recent activity</span>
          </div>
          <div className='ml-5'>
            <ul className='flex gap-4'>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Tasks Completed</Label>
                  <FileText size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>24</p>
                <p className='text-sm text-gray-400'>This week</p>
                <p className='text-sm mt-1'><span className='text-green-400'>+15%</span> from last month</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Upcoming Events</Label>
                  <Calendar size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>3</p>
                <p className='text-sm text-gray-400'>Next 7 Days</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Unread Messages</Label>
                  <MessageSquare size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>12</p>
                <p className='text-sm text-gray-400'>From your team</p>
                <p className='text-sm mt-1'><span className='text-red-400'>-15%</span> from last month</p>
              </li>
              <li className='h-[150px] w-[250px] border-2 rounded-2xl p-4'>
                <div className='flex items-center justify-between'>
                  <Label>Notifications</Label>
                  <Bell size={16} />
                </div>
                <p className='mt-2 font-extrabold text-3xl'>7</p>
                <p className='text-sm text-gray-400'>Pending Actions</p>
              </li>
            </ul>
          </div>
          <div className='flex items-center p-3 ml-3 gap-8'>
            <div className='h-[300px] w-[500px] border-2 rounded-2xl'>
                <div className='p-5'><p className='font-bold text-3xl'>Your Progress</p></div>
                <div className='p-5'>
                  <ul className='flex flex-col gap-4'>
                    <li className='flex flex-col gap-2'>
                      <Label className='font-semibold text-sm'>Project 1</Label>
                      <Progress value={34}/>
                    </li>
                    <li className='flex flex-col gap-2'>
                      <Label className='font-semibold text-sm'>Project 2</Label>
                      <Progress value={50}/>
                    </li>
                    <li className='flex flex-col gap-2'>
                      <Label className='font-semibold text-sm'>Project 3</Label>
                      <Progress value={42}/>
                    </li>
                  </ul>
                </div>
            </div>
            <div className='h-[300px] w-[500px] border-2 rounded-2xl'>
                <div className='p-5'><p className='font-bold text-3xl'>Recent Activity</p></div>
                <div className='ml-5'>
                  <ul className='flex flex-col gap-2'>
                    <li className='flex items-center gap-4'>
                      <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><FileText/></div>
                      <div className='flex flex-col'>
                        <span className='text-xl font-bold'>Document Updated</span>
                        <span className='text-sm text-gray-400'>You Updated "Project1.docx"</span>
                        <span className='text-xs text-gray-400'>30 Minutes Ago</span>
                      </div>
                    </li>
                    <li className='flex items-center gap-4'>
                      <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><MessageSquare/></div>
                      <div className='flex flex-col'>
                        <span className='text-xl font-bold'>New Comment</span>
                        <span className='text-sm text-gray-400'>Masab Commented On Your Task</span>
                        <span className='text-xs text-gray-400'>2 hours ago</span>
                      </div>
                    </li>
                    <li className='flex items-center gap-4'>
                      <div className='p-2 bg-gray-200 w-[40px] rounded-3xl'><Calendar/></div>
                      <div className='flex flex-col'>
                        <span className='text-xl font-bold'>Meeting Scheduled</span>
                        <span className='text-sm text-gray-400'>Team standup at 10:00 AM tommorow</span>
                        <span className='text-xs text-gray-400'>5 hours ago</span>
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

export default UserDashboard
