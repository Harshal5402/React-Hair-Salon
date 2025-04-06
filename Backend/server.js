import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import serviceRouter from "./routes/serviceRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import cartRouter from "./routes/cartRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import accountRouter from "./routes/accountRoute.js";

import http from "http";
import { Server } from "socket.io";

// app config
const app = express();
const port = process.env.PORT || 4000;

// ADDED FOR SOCKET.IO - create HTTP server
const server = http.createServer(app);

// ADDED FOR SOCKET.IO - create io instance
const io = new Server(server, {
  cors: {
    // origin: "*",
    origin: [process.env.USER_WEBSITE_URL, process.env.ADMIN_WEBSITE_URL],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});


// ADDED FOR SOCKET.IO - socket connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
});

// ADDED FOR SOCKET.IO - make io available across app
app.set("io", io);

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/service", serviceRouter);
app.use("/images", express.static("uploads"));
app.use("/api/appoint", appointmentRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", paymentRouter);
app.use("/api/account", accountRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// CHANGED: app.listen -> server.listen for socket.io to work
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
