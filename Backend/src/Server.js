import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import groupRoutes from "./routes/group.routes.js"
import { connectDb } from "./Lib/db.js"
import { app, server } from "./Lib/socket.js"

env.config();

// Allow access from anywhere
app.use(cors({
  origin: ["https://social-talk.vercel.app"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/message", messageRoutes);
app.use("/api/groups", groupRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running", version: "1.0.1" });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`your server run on http://localhost:${PORT}`);
  connectDb();
})