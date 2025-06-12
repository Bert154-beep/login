import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Mail, Phone, MapPin, Calendar, UserCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/Context/AuthContext'

const ProfilePage = () => {

  const {User, logout} = useContext(AuthContext)

 
  if(!User){
    return <div>Loading...</div>
  }

  
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Link to='/EditProfile'><Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button></Link>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={User?.image|| "/placeholder.svg"} alt='Profile' />
              <AvatarFallback className="text-3xl">
                {User?.Username}
              </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <CardTitle className="text-3xl">{User?.Username}</CardTitle>
                <CardDescription className="text-lg">{User?.Email}</CardDescription>
                <p className='text-muted-foreground mt-2 leading-relaxed'>{User?.shortBio}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{User?.Email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{User?.PhoneNo}</p>
                  </div>
                </div>
          

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">{User?.dob}</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-3">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Gender</p>
                    <p className="text-sm text-muted-foreground">{User?.gender}</p>
                  </div>
                </div>
              
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{User?.Address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Your areas of expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
                {Array.isArray(User?.Skills) && User.Skills.map((skill, index)=>{
                  return <Badge key={index} variant='secondary'>
                    {skill}
                  </Badge>
                })} 
            </div>
          </CardContent>
        </Card>
        <div className="w-full flex justify-end">
          <Button onClick={() => { logout() }}>
            Log Out
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage


