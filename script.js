// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize tasks array
    let tasks = [];
    
    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(function(taskText) {
                addTaskToDOM(taskText, false); // 'false' means don't save again
            });
        }
    }
    
    // Function to add task to DOM (and optionally save)
    function addTaskToDOM(taskText, save = true) {
        // Check if task text is not empty
        if (taskText.trim() === "") {
            if (save) alert("Please enter a task!");
            return;
        }
        
        // Task Creation and Removal
        // Create new list item (li)
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        
        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from tasks array
            const taskIndex = tasks.indexOf(taskText);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                saveTasks();
            }
        };
        
        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);
        
        // Add to tasks array and save if needed
        if (save) {
            tasks.push(taskText.trim());
            saveTasks();
        }
    }
    
    // Main addTask function (called by button/enter)
    function addTask() {
        const taskText = taskInput.value.trim();
        addTaskToDOM(taskText, true); // 'true' means save to Local Storage
        taskInput.value = "";
    }
    
    // Load tasks from Local Storage when page loads
    loadTasks();
    
    // Attach Event Listeners
    
    // Add an event listener to addButton that calls addTask when the button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Invoke the addTask function on DOMContentLoaded
    addTask();
});
