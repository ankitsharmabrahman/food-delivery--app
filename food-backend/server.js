const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // JSON body parsing

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ankit123", // apna password yaha dalna
  database: "foodapp"
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("Database connected!");
  }
});

// ✅ Test DB route
app.get("/check-db", (req, res) => {
  db.query("SELECT DATABASE() AS db", (err, result) => {
    if (err) res.status(500).json(err);
    else res.json(result);
  });
});

// ✅ Get all foods
app.get("/foods", (req, res) => {
  db.query("SELECT * FROM foods", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ Add new food
app.post("/add-food", (req, res) => {
  console.log("Request Body:", req.body); // ✅ check frontend data

  const { name, price } = req.body;

  if(!name || !price) {
    console.log("Name or price missing!");
    return res.status(400).json({ error: "Name and price required" });
  }

  db.query(
    "INSERT INTO foods (name, price) VALUES (?, ?)",
    [name, price],
    (err, result) => {
      if (err) {
        console.log("MySQL Error:", err); // error log
        return res.status(500).json(err);
      }
      console.log("Inserted ID:", result.insertId); // success log
      res.json({ message: "Food added successfully", id: result.insertId });
    }
  );
});

// ✅ Delete food by id
app.delete("/delete-food/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM foods WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Food deleted successfully" });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});