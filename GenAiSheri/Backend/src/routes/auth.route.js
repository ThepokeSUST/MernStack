const express=require('express');
const authRouter= express.Router();

const {registerUserController,loginUserController, logoutUserController, getMeController} =require('../controllers/auth.controller');

const {authUser}= require('../middlewares/auth.middleware')

/**
 * @route POST api/auth/register
 * @description Register new user
 * @access Public
 */
authRouter.post('/register',registerUserController)

/**
 * @route POST api/auth/login
 * @description Login user with email and password
 * @access Public
 */
authRouter.post("/login",loginUserController);


/**
 * @route GET api/auth/logout
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

authRouter.get("/logout",logoutUserController)

/**
 * @route GET api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get('/get-me',authUser,getMeController)

module.exports= authRouter;