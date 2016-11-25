import Flight from 'flight';
import Events from 'events';
import TodoComponent from 'components/todo-item';

class TodoListComponent extends Flight.Component {
    listen() {
        this.on('data/todo').listen(
            Events.Todo.Added, event => this.addTodo(event.todo),
            Events.Todo.Removed, event => this.removeTodo(event.todo),
            Events.TodoList.Ready, event => this.showTodoList(event.todos),
        );
    }

    addTodo(todo) {
        const todoComponent = new TodoComponent(todo);
        const newItem = document.createElement('li');
        newItem.id = `todo-${todo.id}`;
        newItem.appendChild(todoComponent.render());
        this.view.appendChild(newItem);
    }

    removeTodo(todo) {
        this.view.querySelector(`#todo-${todo.id}`).remove();
    }

    clearTodos() {
        this.view.innerHTML = "";
    }

    showTodoList(todos) {
        this.clearTodos();
        for(let todo of todos) {
            this.addTodo(todo);
        }
    }
}

export default TodoListComponent;
