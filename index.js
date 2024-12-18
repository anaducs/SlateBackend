require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const http = require("http");

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

const userRoute = require("./Routes/User"); 
const initializeSocket = require("./Service/DocumentService"); 
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookie());

// Routes
app.use("/api/users", userRoute);

// Database connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((e) => {
    console.error("Error connecting to DB:", e);
  });


const server = http.createServer(app);


initializeSocket(server);


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
