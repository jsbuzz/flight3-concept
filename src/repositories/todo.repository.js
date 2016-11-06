import Repository from 'flight/repository';
import Events from 'events';
import EventChannels from 'events/channels';
import Todo from 'domain/todo';

class TodoRepository extends Repository {
    constructor() {
        super();
        this.todos = new Map();
        this._id = 1;
    }

    listen() {
        EventChannels.Todo.listen(
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

        EventChannels.Todo.trigger(new Events.Todo.Added(item));
        EventChannels.Todo.trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    update(todo) {
        const item = new Todo(todo);
        this.todos.set(item.id, item);
        EventChannels.Todo.$(todo.id).trigger(new Events.Todo.Updated(item));
        EventChannels.Todo.trigger(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    remove(todo) {
        const item = new Todo(todo);
        this.todos.delete(todo.id);
        EventChannels.Todo.trigger(new Events.Todo.Removed(item));
        EventChannels.Todo.trigger(new Events.TodoList.ActiveCount(this.activeCount()));
        EventChannels.Todo.$(todo.id).detach();
    }

    prepareList(requestEvent) {
        const list = [];

        for(let [k, todo] of this.todos.entries()) {
            if(!requestEvent.state || todo.state == requestEvent.state) {
                list.push(todo);
            }
        }

        EventChannels.Todo.trigger(new Events.TodoList.Ready(list));
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
