// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid re-saving
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If called from button/Enter, read from input field
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // If input is empty, show alert
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Handle task removal
        removeButton.onclick = () => {
            taskList.removeChild(li);

            // Update Local Storage
            const updatedTasks = Array.from(taskList.children).map(
                item => item.firstChild.textContent
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append button and list item
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage only if not loading from Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input
        taskInput.value = "";
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => addTask());

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});