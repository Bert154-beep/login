import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/Context/AuthContext';

const EditProfile = () => {
  const countries = [
    "United States", "Canada", "United Kingdom", "Australia",
    "Germany", "France", "Japan", "Pakistan", "Brazil", "Mexico", "Other"
  ];

  const genderOptions = ["Male", "Female"];

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const ProfileSchema = z.object({
    Username: z.string().min(3, "Full Name is Required!"),
    Email: z.string().email("Invalid email address").nonempty("Email is Required!"),
    Address: z.string().nonempty("Address is Required!"),
    country: z.string().nonempty("Country is Required!"),
    PhoneNo: z.string().optional(),
    state: z.string().optional(),
    dob: z.string().optional(),
    city: z.string().optional(),
    postalcode: z.string().optional(),
    gender: z.string().optional(),
    Skills: z.array(z.string()).optional(),
    shortBio: z.string().optional(),
    profilePic: z.any().refine((file) => file instanceof File, "Profile Pic is Required!")
  });

  const { EditProfile } = useContext(AuthContext);

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      Skills: [],
      profilePic: null
    }
  });

  const addSkills = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updatedSkills = [...skills, trimmed];
      setSkills(updatedSkills);
      setValue("Skills", updatedSkills, { shouldValidate: true });
      setNewSkill("");
    }
  };

  const removeSkills = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue("Skills", updatedSkills, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('Username', data.Username);
    formData.append('Email', data.Email);
    formData.append('Address', data.Address);
    formData.append('country', data.country);
    formData.append('PhoneNo', data.PhoneNo || '');
    formData.append('state', data.state || '');
    formData.append('dob', data.dob || '');
    formData.append('city', data.city || '');
    formData.append('postalcode', data.postalcode || '');
    formData.append('gender', data.gender || '');
    formData.append('Skills', JSON.stringify(skills));
    formData.append('shortBio', data.shortBio || '');
    if (data.profilePic) {
      formData.append('profilePic', data.profilePic);
    }

    EditProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>Update your personal information and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                {
                  watch('profilePic') && (
                    <AvatarImage src={URL.createObjectURL(watch('profilePic'))} alt="Profile" />

                  )
                }
                <AvatarFallback className="text-2xl">U</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <Label htmlFor="profile-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                    <Upload className="h-4 w-4" />
                    <span>Upload Photo</span>
                  </div>
                </Label>
                <Input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("profilePic")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setValue("profilePic", file, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.profilePic && <p className="text-sm text-red-500">{errors.profilePic.message}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="Username">Full Name *</Label>
                  <Input {...register("Username")} id="Username" />
                  {errors.Username && <p className="text-sm text-red-500">{errors.Username.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input {...register("Email")} id="email" type="email" />
                  {errors.Email && <p className="text-sm text-red-500">{errors.Email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input {...register("PhoneNo")} id="phoneNumber" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input {...register("dob")} id="dateOfBirth" type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea {...register("Address")} id="address" rows={3} />
                  {errors.Address && <p className="text-sm text-red-500">{errors.Address.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stateProvince">State/Province</Label>
                  <Input {...register('state')} id="stateProvince" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input {...register("city")} id="city" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input {...register('postalcode')} id="postalCode" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-2 cursor-default">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkills(skill)}
                      className="ml-1 rounded-full p-0.5 hover:bg-red-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkills();
                    }
                  }}
                />
                <Button type="button" size="icon" onClick={addSkills}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About You</h3>
              <div className="space-y-2">
                <Label htmlFor="shortBio">Short Bio</Label>
                <Textarea id="shortBio" rows={4} {...register('shortBio')} />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Link to='/Profile'>
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
