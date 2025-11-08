// index.js (Main Backend)

const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket/index.js");

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ Step 1: Proper CORS Configuration for APIs
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://chat-app-u2cq.onrender.com",
      "https://your-frontend-domain.com", // optional if frontend deployed
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// ✅ Step 2: Routes
app.get("/", (req, res) => {
  res.send("✅ Chat App Backend Running Successfully!");
});

app.use("/auth", require("./Routes/auth_routes.js"));
app.use("/user", require("./Routes/userRoutes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// ✅ Step 3: Create HTTP server
const server = http.createServer(app);

// ✅ Step 4: Initialize Socket.io
initSocket(server);

// ✅ Step 5: Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  connectDB();
});
