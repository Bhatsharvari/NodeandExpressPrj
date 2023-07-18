const jwt=require("jsonwebtoken");
const User = require("../Models/User");
const authorizeUser=async (req,res,next)=>{
    try {
        let token=req.cookies.jwt
        if(token)
        {
            let decodedToken=await jwt.verify(token,"SECRET")
            console.log(decodedToken);
            if(decodedToken)
            {
                next()
            }
        }
        else
        {
            res.redirect("/auth/login")
        }
        
    } catch (error) {
        console.log(error);
        res.redirect("/auth/login")
        
    }
}

const checkUser=async (req,res,next)=>{
    try {
        let token=req.cookies.jwt
        if(token)
        {
            let decodedToken=await jwt.verify(token,"SECRET")
            
            if(decodedToken)
            {
                let id=decodedToken.id
                let user=await User.findById(id)
                req.user=user
                next()
            }
        }
        else
        {   req.user=null
            res.redirect("/auth/login")
        }
        
    } catch (error) {
        req.user=null
        console.log(error);
        res.redirect("/auth/login")
        
    }
}
module.exports={
    authorizeUser,checkUser
}