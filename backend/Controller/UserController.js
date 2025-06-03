const userModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const RegisterUser = async (req,res)=>{
   try {
     const {Username, password, ConfirmPassword} = req.body

    if(!Username || !password || !ConfirmPassword){
        return res.json({
            error: "All Fields Are Required!"
        })
    }

    if(password.length < 5){
        return res.json({
            error: "Password Must be greater than 5 characters"
        })
    }

    if(password !== ConfirmPassword){
        return res.json({
            error: "Passwords Donot Match!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        Username,
        password: hashedPassword
    })

    return res.json(newUser)
    
   } catch (error) {
        console.log("An Error Occured!", error)
   }
}

const loginUser = async (req,res)=>{
    try {
        const {Username, password} = req.body

        if(!Username || !password){
            return res.json({
                error: "All Fields Are Required!"
            })
        }

        const user = await userModel.findOne({Username})

        if(!user){
            return res.json({
                error: "Incorrect Username or password!"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({
                error: "Incorrect Username or Password"
            })
        }

        const token = jwt.sign({
            username: user.Username
        }, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.json({token})
    } catch (error) {
        console.log("An Error Occured!", error)
    }
};

const getProfile = async (req,res)=>{
    try {
        const ProfileData = req.user
        if(!ProfileData){
            return res.json({
                error: "No User Profile!"
            })
        }
        return res.json(ProfileData)
    } catch (error) {
        console.log("An Error Occured!", error)
    }
}


module.exports = {
    RegisterUser,
    loginUser,
    getProfile
};