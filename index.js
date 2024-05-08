//1Loads .env file contents into process.env by default. If DOTENV_KEY is present, it smartly attempts to load encrypted .env.vault file contents into process.env.
require('dotenv').config()

//2import express
const express = require('express')

//3import cors
const cors = require('cors')
//7 import DB
const db= require('./DB/connection')
//8 import router
const router = require('./ROUTES/router')
const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//4 creates an express application
const pfServer = express()

//5 use
pfServer.use(cors())
pfServer.use(express.json())//Returns middleware that only parses json
//9
// pfServer.use(applicationMiddleware)
pfServer.use(router)

//To view images in frontend
pfServer.use('/uploads',express.static('./uploads'))

//6 port creation
const PORT = 4000 || process.env.PORT//to runon any other port other than 4000

pfServer.listen(PORT,()=>{
    console.log('pfServer listening on port'+PORT);
})

pfServer.get('/',(req,res)=>{
    res.send("WELCOME TO PROJECT-FAIR")
})

