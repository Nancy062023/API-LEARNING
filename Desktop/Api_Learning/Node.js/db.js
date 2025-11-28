import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pragya@123", // correct password
  database: "myapp"
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database!");
});

export default db;
