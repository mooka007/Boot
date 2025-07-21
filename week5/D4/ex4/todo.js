export default class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  completeTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
    }
  }

  listTasks() {
    return this.tasks;
  }
}