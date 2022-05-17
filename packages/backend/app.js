const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  const sql = "select * from Todos";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/todos", (req, res) => {
  const data = {
    title: req.body.title,
    isDone: req.body.isDone,
  };
  const sql = "INSERT INTO Todos (title, isDone) VALUES (?,?)";
  const params = [data.title, data.isDone];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: result,
      id: this.lastID,
    });
  });
});

app.listen(3000, () => {
  console.log("Server started!");
});
