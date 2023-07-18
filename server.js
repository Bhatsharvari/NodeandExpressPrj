const express= require("express");
const { default: mongoose } = require("mongoose");
const authRouter = require("./Routes/authRoutes");
const cookieParser=require("cookie-parser");
const appRouter = require("./Routes/appRoutes");
let app=express()
// register template engine
app.set("view engine","ejs")

// mongodb  connection
async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/auth2")
    console.log("mongodb connection");
}
db()
// inbuild middle ware
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


//path
app.use('/auth',authRouter)
app.use('/app',appRouter)
app.listen(5000,()=>{
    console.log("server is running on port no 5000");
})
app.get("/setCookie",(req,res)=>{
    res.cookie("name","pooja",{  
        maxAge:24*60*60*1000,
        httpOnly:true,
        secure:true
    })
    res.send("cookie set")
})

 app.get("/getCookie",(req,res)=>{
     res.send(req.cookies)
 })

 app.get("/deleteCookie",(req,res)=>{
    res.clearCookie("name")
     res.send("deleted cookie")
})