import React from 'react'
import { EyeOff, Eye, UserCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {

    const [ShowPassword, setShowPassword] = useState(null)
    const [LoginDetails, setLoginDetails] = useState({
        Username: '',
        password: ''
    })

    const { loginUser } = useContext(AuthContext)

    const handleSubmit = (e)=>{
        e.preventDefault()
        loginUser(LoginDetails)
    }

    return (
        <div className='w-full h-dvh bg-black flex items-center justify-center'>
            <div className='w-[300px] h-[500px] rounded-3xl bg-white'>
                <div className='p-5'><span className='font-bold text-2xl'>Login</span></div>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <div className='flex p-2 flex-col'>
                            <span className='mb-2 font-bold'>Username</span>
                            <div className='w-full p-1 border-2 flex items-center'>
                                <input value={LoginDetails.Username} onChange={(e) => { setLoginDetails({ ...LoginDetails, Username: e.target.value }) }} className='w-full outline-none' type="text" />
                                <div><UserCircle /></div>
                            </div>
                        </div>
                        <div className='flex flex-col p-2'>
                            <span className='mb-2 font-bold'>Password</span>
                            <div className='w-full p-1 border-2 flex items-center'>
                                <input value={LoginDetails.password} onChange={(e) => { setLoginDetails({ ...LoginDetails, password: e.target.value }) }} className='w-full outline-none' type="text" />
                                <button
                                    type='button'
                                    className='cursor-pointer'
                                    onClick={() => { setShowPassword(!ShowPassword) }}
                                >
                                    {ShowPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className='p-2'>
                            <div><p className='font-bold text-sm'>Do Not Have An Account? <Link to='/SignUp'><span className='text-blue-400'>Create Account</span></Link></p></div>
                        </div>
                        <div className='flex items-center justify-center mt-10'>
                            <button className='p-2 w-[250px] rounded-2xl cursor-pointer bg-blue-500 font-bold'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
