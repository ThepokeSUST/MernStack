const mongoose= require("mongoose");

const blackListTokenSchema= mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is requirerd to be added in blacklist"]
    }
},{timestamps:true});

const tokenBlacklistModel= mongoose.model("blackListToken",blackListTokenSchema);

module.exports= tokenBlacklistModel;