import Flight from 'flight';
import NameSpace from 'namespace';
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
        this.on(NameSpace.System).listen(
            Flight.System.Ready, event => this.loadTodos(),
        );
        this.on(NameSpace.Todo).listen(
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

        this.on(NameSpace.Todo).trigger(new Events.Todo.Added(item));
        this.on(NameSpace.Todo).trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    update(todo) {
        const item = new Todo(todo);
        this.todos.set(item.id, item);
        const UpdateEvent = Events.Todo.Updated(item.id);
        this.on(NameSpace.Todo).trigger(new UpdateEvent(item));
        this.on(NameSpace.Todo).trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    remove(todo) {
        const item = new Todo(todo);
        this.todos.delete(todo.id);
        this.on(NameSpace.Todo).trigger(new Events.Todo.Removed(item));
        this.on(NameSpace.Todo).trigger(new Events.TodoList.ActiveCount(this.activeCount()));
        this.on(NameSpace.Todo).$(todo.id).detach();
    }

    prepareList(requestEvent) {
        const list = [];

        for(let [k, todo] of this.todos.entries()) {
            if(!requestEvent.state || todo.state == requestEvent.state) {
                list.push(new Todo(todo));
            }
        }

        this.on(NameSpace.Todo).trigger(new Events.TodoList.Ready(list));
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
            let activeCount = 0;
            const todos = JSON.parse(todosString);
            todos.forEach((todo) => {
                const item = new Todo(todo);
                this._id = item.id;
                activeCount += item.completed ? 0 : 1;

                this.todos.set(item.id, item);
            });
            this.prepareList({});
            this.on(NameSpace.Todo).trigger(
                new Events.TodoList.ActiveCount(activeCount)
            );
        }
    }
}

export default TodoRepository;
