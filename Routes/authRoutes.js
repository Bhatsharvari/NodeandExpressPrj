const express=require("express")
const { getSignup, getLogin, postSignup, postLogin } = require("../Controller/authController")


let authRouter=express.Router()

authRouter.get("/signup",getSignup)
authRouter.post("/signup",postSignup)
authRouter.get("/login",getLogin)
authRouter.post("/login",postLogin)

module.exports=authRouter;