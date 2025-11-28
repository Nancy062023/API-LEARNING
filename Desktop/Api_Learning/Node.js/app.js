import express from "express";
import authRoutes from "./Routes/authRoutes.js"; 
import userRoutes from "./Routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);  
app.use("/user", userRoutes);  

export default app;
