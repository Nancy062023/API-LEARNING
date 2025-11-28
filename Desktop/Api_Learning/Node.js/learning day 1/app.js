import express from "express";
import sequelize from "./config/db.js";
// import User from "./models/user.js";

const app = express();

app.use(express.json());

// Sync database
sequelize.sync()
  .then(() => {
    console.log("Tables created successfully ✅");
  })
  .catch((err) => {
    console.log("Error syncing tables ❌:", err);
  });

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
