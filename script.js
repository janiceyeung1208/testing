document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    renderTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTaskElement(taskText, false);
        taskInput.value = '';
    }

    function handleTaskClick(e) {
        if (e.target.tagName === 'LI') {
            const li = e.target;
            li.classList.toggle('completed');
            const text = li.childNodes[0].nodeValue.trim();
            const task = tasks.find(t => t.text === text);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        } else if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            const text = li.childNodes[0].nodeValue.trim();
            tasks = tasks.filter(t => t.text !== text);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.remove();
        }
    }

    function createTaskElement(taskText, completed) {
        const li = document.createElement('li');
        li.textContent = taskText;
        if (completed) li.classList.add('completed');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});