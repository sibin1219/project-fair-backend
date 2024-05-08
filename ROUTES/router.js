//1 import express
const express = require('express')

const userController = require('../Controllers/userController')

const projectController = require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerconfig = require('../Middlewares/multerMiddleware')
//2 create router object of express to define path
const router = express.Router() 

//3 Register api call
router.post('/register',userController.register)

//4 login api call
 router.post('/login',userController.login)
 
 //5add project api call
 router.post('/project/add-project',jwtMiddleware,multerconfig.single('projectImage'), projectController.addProject)

 //6 get a particular  project details API
 router.get('/project/get-a-project',jwtMiddleware,projectController.getAProject)

//7 get first 3   project details for home API
router.get('/project/home-project',projectController.getHomeProjects) //token is not needed to check because before login 3 projects are displayed in home
 
//8 get all  projects details for  API
router.get('/project/all-project',jwtMiddleware,projectController.allProjects)

//9 delete project
router.delete('/project/delete-a-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//10 update user project
router.put('/project/update-use-project/:pid',jwtMiddleware,multerconfig.single('projectImage'), projectController.updateUserProject)

module.exports = router