import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const ForbiddenPage = () => {
  return (
    <div className='flex items-center justify-center w-full h-dvh'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <p className='text-5xl font-extrabold'>Access Denied!</p>
        <p className='text-xl font-semibold'>You cannot Access this Page!</p>
        <div><Link to='/'><Button>Return To Login Page</Button></Link></div>
      </div>
    </div>
  )
}

export default ForbiddenPage