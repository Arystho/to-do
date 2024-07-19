document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Charger les tâches existantes
    fetch('tasks.php')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(addTaskToList);
        });

    // Ajouter une nouvelle tâche
    taskForm.addEventListener('submit', event => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            fetch('tasks.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `task=${taskText}`
            })
            .then(response => response.json())
            .then(task => {
                addTaskToList(task);
                taskInput.value = '';
            });
        }
    });

    // Ajouter une tâche à la liste
    function addTaskToList(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id;
        listItem.className = task.completed ? 'completed' : '';
        listItem.innerHTML = `
            <span>${task.text}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
        `;
        taskList.appendChild(listItem);

        // Gérer les mises à jour de l'état de la tâche
        listItem.querySelector('input').addEventListener('change', () => {
            const isChecked = listItem.querySelector('input').checked;
            fetch('tasks.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${task.id}&completed=${isChecked}`
            })
            .then(response => response.json())
            .then(() => {
                listItem.className = isChecked ? 'completed' : '';
            });
        });
    }
});


