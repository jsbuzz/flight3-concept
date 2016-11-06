import Flight from 'flight';
import Todo from 'domain/todo';
import Events from 'events';
import EventChannels from 'events/channels';

class TodoComponent extends Flight.Component {
    constructor(todo) {
        super()
        this.todo = todo;
    }

    listen() {
        EventChannels.Todo.$(this.todo.id).listen(
            Events.Todo.Updated, event => this.update(event.todo)
        );
        this.on('ui:label').listen(
            'dblclick', event => this.setEditMode(true),
        );
        this.on('ui:.edit').listen(
            'keypress', event => this.onEditorKeyPress(event),
        );
        this.on('ui:.toggle').listen(
            'click', event => this.toggleState(event),
        );
        this.on('ui:.destroy').listen(
            'click', event => this.destroy(),
        );
    }

    render() {
        this.view = document.createElement('todo');

        this.toggle = this.view.appendChild(document.createElement('input'));
        this.toggle.className = "toggle";
        this.toggle.type = "checkbox";

        this.label = this.view.appendChild(document.createElement('label'));

        this.remove = this.view.appendChild(document.createElement('button'));
        this.remove.className = "destroy";

        this.editor = this.view.appendChild(document.createElement('input'));
        this.editor.className = "edit";
        this.editor.type = "text";

        this.update(this.todo);

        return super.render();
    }

    toggleState(event) {
        this.todo.state = this.toggle.checked ? Todo.Completed : Todo.Active;

        EventChannels.Todo.trigger(
            new Events.Todo.Update(this.todo)
        );
    }

    setEditMode(state) {
        this.view.className = state ? 'editing' : '';
    }

    onEditorKeyPress(event) {
        if(event.charCode == 13) {
            this.todo.title = this.editor.value;

            this.setEditMode(false);

            EventChannels.Todo.trigger(
                new Events.Todo.Update(this.todo)
            );
        }
    }

    update(todo) {
        this.todo = todo;
        this.label.textContent = todo.title;
        this.editor.value = todo.title;
        this.toggle.checked = todo.state == Todo.Completed;
        this.view.className = todo.state;
    }

    destroy() {
        EventChannels.Todo.trigger(
            new Events.Todo.Remove(this.todo)
        );
    }
}

export default TodoComponent;
