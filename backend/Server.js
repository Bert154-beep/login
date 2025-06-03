const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const UserRouter = require('./Routes/UserRoutes')
const ConnectToDB = require('./Config/db')
const cors = require('cors')


dotenv.config()
ConnectToDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

// Routers
app.use('/User', UserRouter)
const PORT = process.env.PORT

app.listen(PORT, (req,res)=>{
    console.log(`App is Running at PORT`)
})