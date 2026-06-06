const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"account already exist"],
        required:true
    },
    password:{
        type:String,
        required:true,

    }
});

const userModel= mongoose.model("user",userSchema);

module.exports= userModel;