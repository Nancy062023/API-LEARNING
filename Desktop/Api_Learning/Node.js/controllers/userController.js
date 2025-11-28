import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error while hashing password",
        error: err.message,
      });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error while registering user",
          error: err.message,
        });
      }
      res.status(201).json({
        success: true,
        message: "User registered successfully 🎉",
        data: { id: result.insertId, name, email },
      });
    });
  });
};

// Login Controller
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error while logging in",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found ❌",
      });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server error while comparing passwords",
          error: err.message,
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials ❌",
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful ✅",
        data: {
          user: { id: user.id, name: user.name, email: user.email },
          token,
        },
      });
    });
  });
};
