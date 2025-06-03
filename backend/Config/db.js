const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected To DB!")
    })
}

module.exports = ConnectToDB;