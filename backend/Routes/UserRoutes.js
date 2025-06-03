const express = require('express')
const router = express.Router()
const {RegisterUser, loginUser, getProfile} = require('../Controller/UserController')
const {AuthMiddleware} = require('../Middleware/AuthMiddleware')


// Routes
router.post('/Login', loginUser)
router.post('/SignUp', RegisterUser)
router.get('/getProfile', AuthMiddleware, getProfile)

module.exports = router;