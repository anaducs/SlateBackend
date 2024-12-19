require("dotenv").config();
const socketIo = require("socket.io");
const documentModel = require("../Models/Document");
const userModel = require("../Models/userModel");
const cookieParser = require("cookie");
const jwt = require("jsonwebtoken");

let io;
const defaultValue = "";

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    try {
      if(!socket){
        console.log('no connection ');
        
      }
           
      const cookies = socket.request.headers.cookie;
      const parsedl = cookieParser.parse(cookies);
      const token = parsedl.token
      if (!cookies) {
        socket.emit("error", "no token");
        console.log('no token error');        
        return;
      }
      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err,user) => {
          if (err) {
            socket.emit("error", "invalid token");
            console.log('JWT',err);            
            return;
          }

          console.log("userconnected");
      // Room creation
      socket.on("get-document", async (userId, documentId) => {
        try {
          if (!userId || !documentId) {
            socket.emit("error", "Invalid userId or documentId");
            return;
          }

          const document = await findOrCreateDoc(userId, documentId);

          socket.join(documentId);
          socket.emit("load-document", document.data);

          socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("received-message", delta);
          });

          socket.on("save-document", async (data) => {
            try {
              await documentModel.findByIdAndUpdate(documentId, { data });
              console.log("Document saved successfully:", documentId);
            } catch (err) {
              console.error("Error saving document:", err);
            }
          });
        } catch (err) {
          console.error("Error in 'get-document':", err);
          socket.emit("error", "An error occurred while fetching the document");
        }
      });
          
        }
      );
      
    } catch (err) {}

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  const findOrCreateDoc = async (uid, id) => {
    try {
      const user = await userModel.findById(uid);
      if (!user) {
        throw new Error("User not found");
      }

      let document = await documentModel.findById(id);
      if (document) {
        if (String(document.userId) !== String(uid)) {
          throw new Error("Unauthorized access to the document");
        }
        return document;
      }

      document = await documentModel.create({
        _id: id,
        data: defaultValue,
        userId: uid,
      });
      return document;
    } catch (err) {
      console.error("Error in 'findOrCreateDoc':", err);
      throw err;
    }
  };

  return io;
};

module.exports = initializeSocket;
