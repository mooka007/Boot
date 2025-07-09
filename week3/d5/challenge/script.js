const tasks = [];
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const listTasks = document.querySelector('.listTasks');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        task_id: tasks.length,
        text: taskText,
        done: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.setAttribute('data-task-id', task.task_id);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', doneTask);
    
    const label = document.createElement('label');
    label.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', deleteTask);
    
    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);
    taskElement.appendChild(deleteBtn);
    
    listTasks.appendChild(taskElement);
}

// Bonus I
function doneTask(e) {
    const taskElement = e.target.parentElement;
    const taskId = parseInt(taskElement.getAttribute('data-task-id'));
    const label = taskElement.querySelector('label');
    
    tasks[taskId].done = e.target.checked;
    
    if (e.target.checked) {
        label.classList.add('done');
    } else {
        label.classList.remove('done');
    }
}

// Bonus II
function deleteTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = parseInt(taskElement.getAttribute('data-task-id'));
    
    tasks.splice(taskId, 1);
    
    tasks.forEach((task, index) => {
        task.task_id = index;
    });
    
    taskElement.remove();
    
    document.querySelectorAll('.task').forEach((taskEl, index) => {
        taskEl.setAttribute('data-task-id', index);
    });
}