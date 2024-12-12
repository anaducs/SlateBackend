const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URL;
const port = process.env.PORT;


//middleware
app.use(express.json());



//routes




//db


mongoose.connect(uri).then(
    ()=>{
        console.log("db connected!");
        
    }
    
).catch(e=>{console.log(e.errorResponse);
})





//server
app.listen(port || 5000,()=>{
    console.log(`server started on ${port}`);
    
})

 