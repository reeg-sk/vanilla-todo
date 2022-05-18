const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();

router.patch("/todo/:id/isdone", todoController.updateIsDone);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
