const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URL;
const port = process.env.PORT;

const userRoute = require('./Routes/User');

//middleware
app.use(cors());
app.use(express.json());

app.use('/api/users',userRoute);


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

 