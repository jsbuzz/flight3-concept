import Flight from 'flight';
import Events from 'events';
import Todo from 'domain/todo';

class TodoComponent extends Flight.Component {
    constructor(todo) {
        super()
        this.todo = todo;
    }

    listen() {
        this.events(`data/todo/#${this.todo.id}`).on(
            Events.Todo.Updated, event => this.update(event.todo)
        );
        this.events('ui:label').on(
            'dblclick', event => this.setEditMode(true),
        );
        this.events('ui:.edit').on(
            'keypress', event => this.onEditorKeyPress(event),
        );
        this.events('ui:.toggle').on(
            'click', event => this.toggleState(event),
        );
        this.events('ui:.destroy').on(
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

        this.events(`data/todo`).trigger(
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

            this.events(`data/todo`).trigger(
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
        this.events(`data/todo`).trigger(
            new Events.Todo.Remove(this.todo)
        );
    }
}

export default TodoComponent;
