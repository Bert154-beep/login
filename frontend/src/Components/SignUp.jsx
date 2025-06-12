import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff, UserCircle, ArrowLeft } from 'lucide-react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'


const SignUp = () => {

    const { registerUser } = useContext(AuthContext)

    const SignUpSchema = z.object({
        Username: z.string().min(3, "Username is required!"),
        password: z.string().min(5, "Password must be at least 5 characters!"),
        confirmPassword: z.string().min(5, "Please confirm your password."),
        role: z.enum(['user', 'admin'], { errorMap: ()=> ({message: "Select A Role!"})})
    })

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(SignUpSchema)
    })

    const onSubmit = (data) => {
        registerUser(data)
    }


    return (
        <div className='w-full h-dvh bg-black flex items-center justify-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Link to='/'><ArrowLeft className='cursor-pointer' /></Link>
                        <CardTitle>Create your account</CardTitle>
                    </div>
                    <CardDescription>
                        Enter Username and Password to Create Your Account.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    {...register('Username')}
                                />
                                {errors.Username && (<p className='text-sm text-red-500'>{errors.Username.message}</p>)}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input {...register('password')} id="password" type="password" required />
                                {errors.password && (<p className='text-sm text-red-500'>{errors.password.message}</p>)}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="ConfirmPassword">Confirm Password</Label>

                                </div>
                                <Input {...register('confirmPassword')} id="ConfirmPassword" type="password" required />
                                {errors.confirmPassword && (<p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>)}
                            </div>
                            <div className='grid gap-2'>
                                <Label>Select A Role</Label>
                                <div>
                                    <RadioGroup value={watch("role")} onValueChange={(value)=>{setValue("role", value)}} className='flex gap-6'>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='user' id='user-role'/>
                                            <Label htmlFor='user-role'>User</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='admin' id='admin-role'/>
                                            <Label htmlFor='admin-role'>Admin</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-5">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp
