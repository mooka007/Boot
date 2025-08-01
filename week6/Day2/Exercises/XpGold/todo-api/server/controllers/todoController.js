const todoModel = require('../models/todoModel');

exports.getAllTodos = (req, res) => {
  try {
    const todos = todoModel.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodoById = (req, res) => {
  try {
    const todo = todoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTodo = (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTodo = todoModel.create({
      title: req.body.title,
      completed: req.body.completed || false
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTodo = (req, res) => {
  try {
    const updatedTodo = todoModel.update(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const deletedTodo = todoModel.delete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
