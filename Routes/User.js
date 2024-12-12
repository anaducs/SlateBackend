const express = require('express');
const route = express.Router();
const userModel = require('../Models/userModel');

route.post('/register',async (req,res)=>{
const{name,email,password}=req.body;
if(!name || !email|| !password){
    return;
}
try{
const user = new userModel({
    name,email,password
});

const savedUser = await user.save();

res.status(201).json({user:{name:savedUser.name}});

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

