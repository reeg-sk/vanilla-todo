const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbName = path.join(__dirname, "data", "todos.sqlite");
const db = new sqlite.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE Todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        isDone INTEGER
      );`,
      (err) => {
        if (err) {
          console.log("Table already created");
        }
      }
    );
  }
});

module.exports = db;
