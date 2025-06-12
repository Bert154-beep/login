const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Email: {
        type: String
    },
    Address: {
        type: String
    },
    country: {
        type: String
    },
    PhoneNo: {
        type: String
    },
    State:{
        type: String
    },
    dob: {
        type: String
    },
    city: {
        type: String
    },
    postalcode: {
        type: String
    },
    gender: {
        type: String
    },
    Skills: [String],
    shortBio:{
        type:String
    },
    image: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: null
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;