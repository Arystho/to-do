/**
 * This is the main script file for the project.
 */

// Selecting the form element

function init() {
    taskList()
}

function taskList() {
    document.getElementById('taskList').addEventListener('submit', function (e) {
        e.preventDefault();

        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText) {
            taskInput.value = '';
            addTask(taskText);
            taskList();
        }
        
    });
}


