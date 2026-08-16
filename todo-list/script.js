// referred by instructions.md
// ## AGENTS_MD_VERIFIED ##

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTodos();

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    
    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveAndRender();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and render
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    // Functions
    function addTodo() {
        const text = taskInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now().toString(),
                text: text,
                completed: false
            };
            todos.push(newTodo);
            taskInput.value = '';
            
            // If viewing completed tasks, switch to all to see the new task
            if (currentFilter === 'completed') {
                document.querySelector('[data-filter="all"]').click();
            } else {
                saveAndRender();
            }
        }
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveAndRender();
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        // Filter todos
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        // Clear current list
        todoList.innerHTML = '';

        // Render filtered todos
        if (filteredTodos.length === 0) {
            const li = document.createElement('li');
            li.style.padding = '20px';
            li.style.textAlign = 'center';
            li.style.color = '#a0aec0';
            li.textContent = currentFilter === 'all' 
                ? 'No tasks yet. Add one above!' 
                : `No ${currentFilter} tasks.`;
            todoList.appendChild(li);
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <label class="checkbox-container">
                        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <span class="task-text">${escapeHtml(todo.text)}</span>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                `;

                // Add event listeners to newly created elements
                const checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => toggleTodo(todo.id));

                const deleteBtn = li.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

                todoList.appendChild(li);
            });
        }

        // Update counts
        updateCounts();
    }

    function updateCounts() {
        const activeCount = todos.filter(t => !t.completed).length;
        taskCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
        
        // Show/hide clear completed button based on completed tasks
        const hasCompleted = todos.some(t => t.completed);
        clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden'; // using visibility instead of display to maintain layout
    }

    // Helper to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }
});