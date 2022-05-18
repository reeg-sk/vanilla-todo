const express = require("express");
const todosController = require("../controllers/todos");

const router = express.Router();

router.get("/todos", todosController.fetchAllTodos);
router.post("/todos", todosController.createNewTodo);

module.exports = router;
