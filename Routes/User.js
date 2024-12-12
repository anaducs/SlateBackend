const express = require('express');
const route = express.Router();

route.post('/register',(req,res)=>{
    const{name,email,password}=req.body;
if(!name || !email|| !password){
    console.log('error');
    
}
console.log({name,email,password});
res.status(200).json({message:"complete"});


});

route.get('/',(req,res)=>{
    res.send('hi');
})

module.exports = route;

