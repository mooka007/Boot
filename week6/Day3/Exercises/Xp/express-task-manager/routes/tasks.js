const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

// Helper function to read tasks from file
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

// Helper function to write tasks to file
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw error;
  }
}

// Helper function to validate task data
function validateTask(task, isUpdate = false) {
  const errors = [];
  
  if (!isUpdate && !task.title) {
    errors.push('Title is required');
  }
  
  if (task.title && typeof task.title !== 'string') {
    errors.push('Title must be a string');
  }
  
  if (task.description && typeof task.description !== 'string') {
    errors.push('Description must be a string');
  }
  
  if (task.completed !== undefined && typeof task.completed !== 'boolean') {
    errors.push('Completed must be a boolean');
  }
  
  return errors;
}

// Helper function to generate unique ID
function generateId(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// GET /tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Error reading tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve tasks'
    });
  }
});

// GET /tasks/:id - Retrieve specific task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID'
      });
    }
    
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve task'
    });
  }
});

// POST /tasks - Create new task
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    // Validate input
    const validationErrors = validateTask({ title, description, completed });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    const tasks = await readTasks();
    const newTask = {
      id: generateId(tasks),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    
    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
});

// PUT /tasks/:id - Update task by ID
router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID'
      });
    }
    
    const { title, description, completed } = req.body;
    
    // Validate input
    const validationErrors = validateTask({ title, description, completed }, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    // Update task with provided fields
    const updatedTask = {
      ...tasks[taskIndex],
      updatedAt: new Date().toISOString()
    };
    
    if (title !== undefined) updatedTask.title = title.trim();
    if (description !== undefined) updatedTask.description = description.trim();
    if (completed !== undefined) updatedTask.completed = completed;
    
    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    
    res.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
});

// DELETE /tasks/:id - Delete task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID'
      });
    }
    
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await writeTasks(tasks);
    
    res.json({
      success: true,
      data: deletedTask,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
});

module.exports = router;
