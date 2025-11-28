import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const user = results[0];

    // compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      // generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });

      res.json({ message: "Login successful", token });
    });
  });
};
