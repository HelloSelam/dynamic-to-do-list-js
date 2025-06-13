// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the trimmed value from the input field
        const taskText = taskInput.value.trim();

        // If the input is empty, show an alert
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Set up the event to remove the task when the button is clicked
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add click event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to allow "Enter" to add task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});