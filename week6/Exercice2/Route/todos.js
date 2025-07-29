const express = require("express");
const router = express.Router();

let todos = [];
let currentId = 1;

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const newTodo = {
    id: currentId++,
    task,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (task !== undefined) todos[todoIndex].task = task;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter((todo) => todo.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).end();
});

module.exports = router;
