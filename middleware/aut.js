require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookies= require('cookie-parser');

const authorization =(req,res,next)=>{
const token = req.cookies.token;
console.log('from auth',token);

if(!token){
    return res.status(401).json({msg:"Unauthorized"});
}
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
        return res.status(403).json({msg:"Invalid Token"});
    }
    req.user=user;
    next();
});
console.log(token);

}

module.exports=authorization;