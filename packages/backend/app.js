const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const todosRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use(todoRoutes);
app.use(todosRoutes);

module.exports = app;
