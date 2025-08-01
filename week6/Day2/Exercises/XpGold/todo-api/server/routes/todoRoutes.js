const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// GET a single todo
router.get('/:id', todoController.getTodoById);

// POST create a new todo
router.post('/', todoController.createTodo);

// PUT update a todo
router.put('/:id', todoController.updateTodo);

// DELETE a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
