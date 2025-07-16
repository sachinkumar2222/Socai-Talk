import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { connectDb } from "./Lib/db.js"
import {app,server} from "./Lib/socket.js"

env.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes)
app.use("/api/message",messageRoutes);

const PORT= process.env.PORT || 5001;

server.listen(PORT,()=>{
    console.log(`your server run on http://localhost:${PORT}`);
    connectDb();
})