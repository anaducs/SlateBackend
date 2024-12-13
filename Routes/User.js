const express = require('express');
const route = express.Router();
const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const token = require('../Models/token');
const sendMail = require('../utils/emailAuth');
const crypto = require('crypto');


route.post('/register',async (req,res)=>{
const{name,email,password}=req.body;
if(!name || !email|| !password){
    return;
}
try{
var hashedPassword = await bcrypt.hash(password,10); 
const user = new userModel({
    name,email,hashedPassword
});
console.log(hashedPassword);

const savedUser = await user.save();

res.status(201).json({user:{name:savedUser.name},msg:"click on the verification link in your mail for verification"});

}catch(e){
       
res.status(409).json({msg:"email already exits"});

}

});

route.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const t = email;
        const user = await userModel.findOne({email});
        
        if(!user){
           return res.status(404).json({msg:"email not registered"});
        }
        if(!password===user.password){
            return res.status(401).json({msg:"INvalid pASSWORD"});
        }
        console.log("logged in");
        


        
    }catch(err){
            console.log("catch",err)
    }
})

route.get('/',(req,res)=>{
})

module.exports = route;

