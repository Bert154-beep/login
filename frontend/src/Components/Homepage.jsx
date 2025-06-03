import React from 'react'
import { User, UserCircle } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useEffect } from 'react'

const Homepage = () => {

    const {User, getProfile, logout} = useContext(AuthContext)
    console.log(User)

    useEffect(() => {
        getProfile()
    }, [])
    

  return (
    <div className='w-full h-dvh flex items-center justify-center bg-black'>
      <div className='bg-white w-[300px] h-[400px] rounded-3xl'>
        <div className='p-5 flex items-center gap-3'>
            <UserCircle/>
            <p className='font-bold text-xl'>User Details</p>
        </div>
        <div className='p-2 flex items-center gap-2'>
            <p className='font-bold'>The User Is: </p>
            <p>{User?.username}</p>
        </div>

        <div className='flex items-center justify-center mt-10'>
            <button onClick={()=>{logout()}} className='w-[250px] cursor-pointer bg-blue-500 p-2 font-bold rounded-2xl'>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage
