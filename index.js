require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");

const uri = process.env.MONGO_URL;
const port = process.env.PORT;

const userRoute = require("./Routes/User");

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookie());

//routes

app.use("/api/users", userRoute);

//db

mongoose
  .connect(uri)
  .then(() => {
    console.log("db connected!");
  })
  .catch((e) => {
    console.log(e.errorResponse);
  });

//server
app.listen(port || 5000, () => {
  console.log(`server started on ${port}`);
});
