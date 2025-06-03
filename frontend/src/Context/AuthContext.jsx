import { createContext, useState, useEffect } from "react";
import api from '../api/axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){

    const Navigate = useNavigate()

    const [User, setUser] = useState(null)

    const loginUser = async (data)=>{
        try {
            const response = await api.post('/User/Login', data)
            const responseData = response.data
            localStorage.setItem('token', responseData.token)

            if(responseData.error){
                toast.error(responseData.error)
            } else{
                Navigate('/Home')
                toast.success('Login Successful!')
            }
        } catch (error) {
            console.log("An Error Occured", error)
        }
    }

    const registerUser = async (data)=>{
        try {
            const response = await api.post('/User/SignUp', data)
            const responseData = response.data

            if(responseData.error){
                toast.error(responseData.error)
            }else{
                Navigate('/')
                toast.success("Registered Successfully!")
            }
        } catch (error) {
            console.log("An Error Occured!")
        }
    }

    const getProfile = async ()=>{
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('/User/getProfile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const responseData = response.data

            if(responseData.error){
                toast.error(responseData.error)
            } else {
                setUser(responseData)
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    const logout = ()=>{
        try {
            localStorage.removeItem('token')
            Navigate('/')
            toast.success("Logged Out Successfully!")
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    return (
        <AuthContext.Provider value={{loginUser, registerUser, getProfile, User, logout}}>
            {children}
        </AuthContext.Provider>
    )
}