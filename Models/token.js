const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users',
        unique:true,
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,default:Date.now(),expires:3600
    }
})

module.exports=mongoose.model('token',tokenSchema);
