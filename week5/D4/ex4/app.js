import TodoList from './todo.js';

const myTodo = new TodoList();
myTodo.addTask("Learn JavaScript");
myTodo.addTask("Build a project");
myTodo.completeTask(0);

console.log(myTodo.listTasks());