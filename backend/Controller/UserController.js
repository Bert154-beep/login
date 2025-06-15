const userModel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('../Config/cloudinary')
const multer = require('multer')


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
})
const RegisterUser = async (req,res)=>{
   try {
     const {Username, password, confirmPassword, role} = req.body

    if(!Username || !password || !confirmPassword || !role){
        return res.json({
            error: "All Fields Are Required!"
        })
    }

    if(password.length < 5){
        return res.json({
            error: "Password Must be greater than 5 characters"
        })
    }

    if(password !== confirmPassword){
        return res.json({
            error: "Passwords Donot Match!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        Username,
        password: hashedPassword,
        role,
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
            userId: user._id,
            username: user.Username,
            role: user.role,
        }, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.json({token, role: user.role})
    } catch (error) {
        console.log("An Error Occured!", error)
    }
};

const getProfile = async (req,res)=>{
    try {
        const userId = req.user.userId
        const Userdata = await userModel.findOne({_id: userId}).select('-password')
        if(!Userdata){
            return res.json({
                error: "No User Profile!"
            })
        }
        return res.json(Userdata)
    } catch (error) {
        console.log("An Error Occured!", error)
    }
}

const EditProfile = async (req, res) => {
  try {
    const { Username, Email, Address, country, PhoneNo, state, dob, city, postalcode, gender, Skills, shortBio } = req.body;

    const userId = req.user.userId;

    let imageUrl;

    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'auto',
              folder: 'profilePics'
            },
            (error, result) => {
              if (error) {
                console.log(error)
                reject(error)
              } else {
                resolve(result.secure_url)
              }
            }
          )

          stream.end(req.file.buffer);
        })
      }

      imageUrl = await streamUpload();
    }

    const updateUser = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          Username,
          Email,
          Address,
          country,
          PhoneNo,
          state,
          dob,
          city,
          postalcode,
          gender,
          Skills: JSON.parse(Skills),
          shortBio,
          ...(imageUrl && { image: imageUrl }) 
        }
      }
    );

  } catch (error) {
    console.error("Error:", error);

}
};


module.exports = {
    RegisterUser,
    loginUser,
    getProfile,
    EditProfile,
    upload
};