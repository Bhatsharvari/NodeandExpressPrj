const express=require ("express")
const {authorizeUser,checkUser}=require("../Middleware/authmiddleware")
let appRouter=express.Router()

appRouter.get("/home",authorizeUser,checkUser,(req,res)=>{
    console.log(req.user);
    res.render("home", {user:req.user})
})
module.exports = appRouter;