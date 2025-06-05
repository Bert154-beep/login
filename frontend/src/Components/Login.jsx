import React from 'react'
import { EyeOff, Eye, UserCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'



const loginSchema = z.object({
    Username: z.string().min(1, "Username is required!"),
    password: z.string().min(5, "Password is required!")
})


const Login = () => {

   

    const { loginUser } = useContext(AuthContext)


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })
    
    const onSubmit = (data) => {
        loginUser(data)
    }

    return (
        <div className='w-full h-dvh bg-black flex items-center justify-center'>

        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your Username below to login to your account
                </CardDescription>
                <CardAction>
                    <Link to='/SignUp'><Button className='cursor-pointer' variant="link">Sign Up</Button></Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                id='username'
                                {...register("Username")}
                                required
                                />
                                {errors.Username && (
                                    <p className='text-sm text-red-500'>{errors.Username.message}</p>
                                )}
                             
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input  {...register("password")} id="password" type="password" required />
                            {errors.password && (
                                <p className='text-sm text-red-500'>{errors.password.message}</p>
                            )}
                        </div>
                    </div>
                <Button type="submit" className="w-full mt-5">
                    Login
                </Button>
                </form>
            </CardContent>
        </Card>
    </div>
    )
}

export default Login
