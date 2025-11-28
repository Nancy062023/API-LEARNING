import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

export default router;
