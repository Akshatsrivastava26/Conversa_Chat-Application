// socket/index.js

const { Server } = require("socket.io");
const registerHandlers = require("./handlers");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://chat-app-u2cq.onrender.com",
        "https://your-frontend-domain.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("⚡ Socket.io initialized successfully!");

  io.on("connection", (socket) => {
    console.log(`🟢 New socket connection: ${socket.id}`);
    registerHandlers(io, socket);
  });

  return io;
};

module.exports = { initSocket };
