const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    
},{timestamps:true});

module.exports = mongoose.model('Document',documentSchema);