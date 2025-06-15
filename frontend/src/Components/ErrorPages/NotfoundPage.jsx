import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const NotfoundPage = () => {

  const handleReturn = ()=>{
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-center w-full h-dvh'>
      <div className='flex flex-col items-center gap-3 justify-center'>
          <p className='text-7xl font-extrabold'>404</p>
          <p className='text-2xl font-semibold'>Page not Found!</p>
          <div><Link to='/'><Button onClick={handleReturn}>Return To Login Page</Button></Link></div>
      </div>
    </div>
  )
}

export default NotfoundPage