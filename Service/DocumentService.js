const socketIo = require("socket.io");
const documentModel = require("../Models/Document");

let io;
const defaultValue = "";

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    //creating room
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDoc(documentId);
      socket.join(documentId);
      socket.emit("load-document", document.data);
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("received-message", delta);
      });
      socket.on("save-document", async (data) => {
        await documentModel.findByIdAndUpdate(documentId, { data });
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  const findOrCreateDoc = async (id) => {
    if (id == null) return;
    const document = await documentModel.findById(id);
    if (document) return document;

    return await documentModel.create({ _id: id, data: defaultValue });
  };

  return io;
};

module.exports = initializeSocket;
