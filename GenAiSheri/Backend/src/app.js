const express= require("express");
const cookieParser = require("cookie-parser")
const app= express();


app.use(cookieParser())
app.use(express.json())

// require all routes
const authRouter= require('./routes/auth.route');


//using all the routes
app.use('/api/auth',authRouter);



module.exports=app;