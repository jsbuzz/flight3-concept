import Flight from 'flight';
import Todo from 'domain/todo';
import Events from 'events';
import todoTemplate from './template.html';
import TodoPatch from './todo.patch';

class TodoComponent extends Flight.Component {
    constructor(todo) {
        super()
        this.todo = todo;
    }

    listen() {
        this.on(`data/todo/#${this.todo.id}`).listen(
            Events.Todo.Updated, event => this.update(event.todo)
        );
        this.on('ui:label').listen(
            'dblclick', event => this.setEditMode(true),
        );
        this.on('ui:.edit').listen(
            'keyup', event => this.onEditorKeyUp(event),
            'blur', event => this.cancelEditor(),
        );
        this.on('ui:.toggle').listen(
            'click', event => this.toggleState(event),
        );
        this.on('ui:.destroy').listen(
            'click', event => this.destroy(),
        );
    }

    render() {
        this.view = Flight.DOM.render(todoTemplate);
        this.patch = Flight.Patch.create(this.view, TodoPatch);
        this.update(this.todo);
        return super.render();
    }

    toggleState(event) {
        this.todo.state = this.view.$.toggle.checked ? Todo.Completed : Todo.Active;

        this.on('data/todo').trigger(
            new Events.Todo.Update(this.todo)
        );
    }

    setEditMode(state) {
        this.view.className = state ? 'editing' : '';
        state && this.view.$.editor.focus();
    }

    onEditorKeyUp(event) {
        if(event.keyCode == 13) {
            this.todo.title = this.view.$.editor.value;

            this.setEditMode(false);

            if(this.view.$.editor.value) {
                this.on('data/todo').trigger(
                    new Events.Todo.Update(this.todo)
                );
            } else this.destroy();

        } else if(event.keyCode == 27) {
            this.cancelEditor()
        }
    }

    cancelEditor() {
        this.setEditMode(false);
        this.view.$.editor.value = this.todo.title;
    }

    update(todo) {
        this.patch.apply(todo);
    }

    destroy() {
        this.on('data/todo').trigger(
            new Events.Todo.Remove(this.todo)
        );
    }
}

export default TodoComponent;
