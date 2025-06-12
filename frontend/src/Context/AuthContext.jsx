import { createContext, useState, useEffect } from "react";
import api from '../api/axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthContextProvider({ children }) {

    const Navigate = useNavigate()

    const [User, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    const loginUser = async (data) => {
        try {
            setLoading(true)
            const response = await api.post('/User/Login', data)
            const responseData = response.data
            localStorage.setItem('token', responseData.token)

            const profile = await api.get('/User/getProfile', {
                headers: {
                    Authorization: `Bearer ${responseData.token}`
                }
            })

            setUser(profile.data)

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                if (profile.data.role === 'user') {
                    Navigate('/user')
                } else {
                    Navigate('/admin')
                }
                toast.success("Login Successful!")
            }
        } catch (error) {
            console.log("An Error Occured", error)
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (data) => {
        try {
            const response = await api.post('/User/SignUp', data)
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                Navigate('/')
                toast.success("Registered Successfully!")
            }
        } catch (error) {
            console.log("An Error Occured!")
        }
    }

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')
                if (!token) {
                    setLoading(false)
                    return
                }
                const response = await api.get('/User/getProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const responseData = response.data

                if (responseData.error) {
                    toast.error(responseData.error)
                } else {
                    setUser(responseData)
                }
            } catch (error) {
                console.log("An Error Occured!", error)
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [])


    const logout = () => {
        try {
            localStorage.removeItem('token')
            Navigate('/')
            toast.success("Logged Out Successfully!")
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    const EditProfile = async (formdata) => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.post('/User/EditProfile', formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                toast.success("Profile Updated Successfully!")
            }
        } catch (error) {
            console.log("An error Occured!", error)
        }
    }

    return (
        <AuthContext.Provider value={{ loginUser, registerUser, User, logout, EditProfile, Loading }}>
            {children}
        </AuthContext.Provider>
    )
}