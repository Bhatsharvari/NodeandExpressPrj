const {hash}=require("bcrypt")
const User=require("../Models/User")
const bcrypt=require("bcrypt")
const {response}=require("express")
const jwt=require("jsonwebtoken")

const getSignup=(req,res)=>{
    res.render("signup");
}

const postSignup=async(req,res)=>{
    // console.log(req.body);
    const{name,email,password}=req.body 
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            res.render("/auth/login")
            // return res.redirect("/auth/login")
        }else{
            let salt=await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.create({
            name:name,
            email:email,
            password: hashedPassword
        })
        res.redirect("/auth/login")
    } 
    } catch (error) {
        console.log(error);
       res.redirect("/auth/signup") 
    }
}

const getLogin=(req,res)=>{
    res.render("login");
}

const postLogin=async(req,res)=>{
   const{email,password}=req.body
   console.log(req.body);
   try {
    const existingUser=await User.findOne({email})
    console.log(existingUser);
    if(existingUser){
        const verified=await bcrypt.compare(password,existingUser.password)
        if(verified){
            const token=await jwt.sign({id:existingUser._id},"SECRET")
            res.cookie("jwt",token,{
                maxAge:24*60*60*1000,
                httpOnly:true,
                secure:true
            })
            res.redirect("/app/home")
        }else{
            res.redirect("/auth/login")
        }
    }else{
        res.redirect("/auth/login")
    }
   } catch (error) {
    console.log(error);
    res.redirect("/auth/login")
   }
}
module.exports={
    getLogin,
    getSignup,
    getLogin,
    postSignup,
    postLogin
}