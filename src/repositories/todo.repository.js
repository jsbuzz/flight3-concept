import Flight from 'flight';
import Events from 'events';
import Todo from 'domain/todo';

class TodoRepository extends Flight.Repository {
    constructor() {
        super();
        this.todos = new Map();
        this._id = 1;
    }

    listen() {
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
            id    : this._id++
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
        let activeCount = 0;
        for(let [k, todo] of this.todos.entries()) {
            if(todo.state == Todo.Active) {
                ++activeCount;
            }
        }
        return activeCount;
    }
}

export default TodoRepository;
