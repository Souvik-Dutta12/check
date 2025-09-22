// Todo class to create todo objects
class Todo {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
        this.completed = false;
    }
}

// TodoApp class to handle todo operations
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        
        this.initialize();
    }

    initialize() {
        // Add event listeners
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Initial render
        this.renderTodos();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = `flex items-center gap-2 bg-gray-800 p-4 rounded-lg ${todo.completed ? 'opacity-50' : ''}`;
            
            todoItem.innerHTML = `
                <input type="checkbox" 
                    class="w-5 h-5 rounded-md"
                    ${todo.completed ? 'checked' : ''}
                    onchange="todoApp.toggleTodo(${index})">
                <span class="flex-1 ${todo.completed ? 'line-through' : ''}">${todo.text}</span>
                <button onclick="todoApp.deleteTodo(${index})" 
                    class="text-red-500 hover:text-red-600 px-2">
                    Delete
                </button>
            `;
            
            this.todoList.appendChild(todoItem);
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text) {
            const newTodo = new Todo(text);
            this.todos.push(newTodo);
            this.saveTodos();
            this.renderTodos();
            this.todoInput.value = '';
        }
    }

    toggleTodo(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.saveTodos();
        this.renderTodos();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
        this.renderTodos();
    }
}

// Initialize the app
const todoApp = new TodoApp(); 