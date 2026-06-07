const userModel= require('../models/user.model');
const bcrypt= require('bcryptjs')
const jwt= require("jsonwebtoken");
const tokenBlacklistModel= require("../models/blacklist.model");
/**
 * 
 * @name registerUserController
 * @description register a new user.expects username ,email and password
 * @access Public
 * 
 */

async function registerUserController(req,res){

    // console.log("ok")

    const {username,email,password}= req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username , email and password"
        })
    }

    const isUserAlreadyExist= await userModel.findOne({
        $or:[{username},{email}]
    });

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"account already exist"
        })
    }


    const hash= await bcrypt.hash(password,10)

    const user= await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username

    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    });

    res.cookie("token",token);

    return res.status(201).json({
        message:"user register successfully" ,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

/**
 * @name loginUserController
 * @description login user, expects email and password in the request.body
 * @access Public 
 */

async function loginUserController(req,res) {
      
    const {email,password}=req.body;
      
    const user= await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
       return res.status(400).json({
        message:"incorrect password"
       })
    }

    const token= jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token);

    return res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


// async function logoutUserController(req,res) {
       
//     const token = req.cookies.token;

//     if(token){
//         await tokenBlacklistModel.create({token});
//     }

//     res.clearCookie("token");
// }


/**
 * @name logoutUserController
 * @description clear token from the client side and add this token to the blacklist for future use 
 * @access Public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

/**
 * @name getMeController
 * @description get the current user 
 * @access Private
 */

async function getMeController(req,res) {
       
     const user=await userModel.findById(req.user.id);

    //  console.log(user);
    console.log(",,,,,,,,,,,,,,,,,")
    const obj= {
        id:user._id,
        username:user.username,
        email:user.email
    }
    console.log(obj)
     return res.status(200).json({
        // id:user._id,
        username:user.username,
        email:user.email
     })
}


module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}