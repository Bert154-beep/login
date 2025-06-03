import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff, UserCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const SignUp = () => {

    const [ShowPassword, setShowPassword] = useState(null)
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(null)

    const [SignUpDetails, setSignUpDetails] = useState({
        Username: '',
        password: '',
        ConfirmPassword: ''
    })

    const { registerUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser(SignUpDetails)
    }

    return (
        <div className='w-full h-dvh bg-black flex items-center justify-center'>
            <div className='w-[300px] h-[500px] rounded-3xl bg-white'>
                <div className='p-5 flex items-center gap-3 '>
                    <Link to='/'><ArrowLeft size={24} /></Link>
                    <span className='font-bold text-2xl'>SignUp</span>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <div className='flex p-2 flex-col'>
                            <span className='mb-2 font-bold'>Username</span>
                            <div className='w-full p-1 border-2 flex items-center'>
                                <input value={SignUpDetails.Username} onChange={(e) => { setSignUpDetails({ ...SignUpDetails, Username: e.target.value }) }} className='w-full outline-none' type="text" />
                                <div><UserCircle /></div>

                            </div>
                        </div>
                        <div className='flex flex-col p-2'>
                            <span className='mb-2 font-bold'>Password</span>
                            <div className='w-full p-1 border-2 flex items-center'>
                                <input value={SignUpDetails.password} onChange={(e) => { setSignUpDetails({ ...SignUpDetails, password: e.target.value }) }} className='w-full outline-none' type={ShowPassword ? 'text' : 'password'} />
                                <button
                                    type='button'
                                    className='cursor-pointer'
                                    onClick={() => { setShowPassword(!ShowPassword) }}
                                >
                                    {ShowPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col p-2'>
                            <span className='mb-2 font-bold'>Confirm Password</span>
                            <div className='w-full p-1 border-2 flex items-center'>
                                <input value={SignUpDetails.ConfirmPassword} onChange={(e) => { setSignUpDetails({ ...SignUpDetails, ConfirmPassword: e.target.value }) }} className='w-full outline-none' type={ShowConfirmPassword ? 'text' : 'password'} />
                                <button
                                    type='button'
                                    className='cursor-pointer'
                                    onClick={() => { setShowConfirmPassword(!ShowConfirmPassword) }}
                                >
                                    {ShowConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-center mt-10'>
                            <button className='p-2 w-[250px] rounded-2xl cursor-pointer bg-blue-500 font-bold'>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
