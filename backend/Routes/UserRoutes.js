const express = require('express')
const router = express.Router()
const {RegisterUser, loginUser, getProfile, EditProfile} = require('../Controller/UserController')
const {AuthMiddleware} = require('../Middleware/AuthMiddleware')
const {upload} = require('../Controller/UserController')


// Routes
router.post('/Login', loginUser)
router.post('/SignUp', RegisterUser)
router.get('/getProfile', AuthMiddleware, getProfile)
router.post('/EditProfile', AuthMiddleware, upload.single('profilePic'), EditProfile)

module.exports = router;