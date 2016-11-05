import Flight from 'flight';
import Events from 'events';

class NewTodoComponent extends Flight.Component {

    listen() {
        this.events('ui').on(
            'keypress', event => this.onKeyPress(event),
        );
    }

    onKeyPress(event) {
        if(event.charCode == 13 && this.view.value.length) {
            this.events('data/todo').trigger(
                new Events.Todo.Add(this.view.value)
            );
            this.view.value = "";
        }
    }
}

export default NewTodoComponent;
