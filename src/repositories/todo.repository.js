import Flight from 'flight';
import Events from 'events';
import Todo from 'domain/todo';

const TodosKey = 'TodoMVC-todos';

class TodoRepository extends Flight.Repository {

    init() {
        this.todos = new Map();
        this._id = 0;
        this.store = window.localStorage;
    }

    listen() {
        this.on('data/system').listen(
            Flight.System.Ready, event => this.loadTodos(),
        );
        this.on('data/todo').listen(
            Events.Todo.Add, event => this.add(event.title),
            Events.Todo.Update, event => this.update(event.todo),
            Events.Todo.Remove, event => this.remove(event.todo),
            Events.TodoList.Request, event => this.prepareList(event)
        );
    }

    add(title) {
        const item = new Todo({
            title : title,
            id    : ++this._id
        });

        this.todos.set(item.id, item);

        this.on('data/todo').trigger(new Events.Todo.Added(item));
        this.on('data/todo').trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    update(todo) {
        const item = new Todo(todo);
        this.todos.set(item.id, item);
        this.on('data/todo').$(todo.id).trigger(new Events.Todo.Updated(item));
        this.on('data/todo').trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    remove(todo) {
        const item = new Todo(todo);
        this.todos.delete(todo.id);
        this.on('data/todo').trigger(new Events.Todo.Removed(item));
        this.on('data/todo').trigger(new Events.TodoList.ActiveCount(this.activeCount()));
        this.on('data/todo').$(todo.id).detach();
    }

    prepareList(requestEvent) {
        const list = [];

        for(let [k, todo] of this.todos.entries()) {
            if(!requestEvent.state || todo.state == requestEvent.state) {
                list.push(new Todo(todo));
            }
        }

        this.on('data/todo').trigger(new Events.TodoList.Ready(list));
    }

    activeCount() {
        this.storeTodos();
        let activeCount = 0;
        for(let [k, todo] of this.todos.entries()) {
            if(todo.state == Todo.Active) {
                ++activeCount;
            }
        }
        return activeCount;
    }

    storeTodos() {
        const items = [];
        for(let todo of this.todos.values()) {
            items.push(todo);
        }

        this.store.setItem(TodosKey, JSON.stringify(items));
    }

    loadTodos() {
        const todosString = this.store.getItem(TodosKey);
        if(todosString) {
            const todos = JSON.parse(todosString);
            todos.forEach((todo) => {
                const item = new Todo(todo);
                this._id = item.id;

                this.todos.set(item.id, item);
            });
            this.prepareList({});
        }
    }
}

export default TodoRepository;
