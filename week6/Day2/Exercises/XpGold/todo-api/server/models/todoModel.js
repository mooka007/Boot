const { v4: uuidv4 } = require('uuid');

let todos = [
  { id: uuidv4(), title: 'Learn Express', completed: false },
  { id: uuidv4(), title: 'Create API', completed: false }
];

module.exports = {
  findAll: () => todos,
  findById: (id) => todos.find(todo => todo.id === id),
  create: (todo) => {
    const newTodo = { id: uuidv4(), ...todo };
    todos.push(newTodo);
    return newTodo;
  },
  update: (id, updatedTodo) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedTodo };
      return todos[index];
    }
    return null;
  },
  delete: (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      return todos.splice(index, 1)[0];
    }
    return null;
  }
};
