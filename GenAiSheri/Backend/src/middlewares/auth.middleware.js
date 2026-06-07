const jwt= require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');




async function authUser(req,res,next){
    
    const token= req.cookies.token;
    console.log("this is auth middleware");

    if(!token){
      console.log("there is no token");
    return res.status(401).json({
        message:"token not provided"
    })
    }

    const isTokenBlackListed = await tokenBlacklistModel.findOne({token});

    if(isTokenBlackListed){
        return res.status(400).json({
            message:"token is blackListed"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded
        console.log(decoded)
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}


module.exports={
    authUser
}
