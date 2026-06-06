const express=require('express');
const authRouter= express.Router();

const {registerUserController,loginUserController} =require('../controllers/auth.controller');

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



module.exports= authRouter;