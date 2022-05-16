const express = require("express");
const sqlite = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const dbName = path.join(__dirname, "data", "todos.db");
const db = new sqlite.Database(dbName, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'todos.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS Todos (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Is_done INTEGER NOT NULL
);`;

const sql_insert = `INSERT INTO Todos (ID, Title, Is_Done) VALUES
  (1, 'Upratat', 0),
  (2, 'Navarit', 0),
  (3, 'Vyvencit', 0);`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Todos' table");
});

db.run(sql_insert, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of 3 books");
});

app.get("/todos", (req, res) => {
  const sql = "SELECT * FROM Todos ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).send(rows);
  });
});

app.listen(3000, () => {
  console.log("Server started!");
});
