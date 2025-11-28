import express from "express";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
