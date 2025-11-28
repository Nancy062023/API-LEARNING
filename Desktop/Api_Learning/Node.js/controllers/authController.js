import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Login Controller
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1d" });

    res.json({
        message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
};
