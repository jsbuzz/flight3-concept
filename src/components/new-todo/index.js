import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';

const ENTER = 13;

class NewTodoComponent extends Flight.Component {

    listen() {
        this.ui(this.view).listen(
            'keypress', event => this.onKeyPress(event),
        );
    }

    onKeyPress(event) {
        if(event.charCode == ENTER && this.view.value.length) {
            this.on(NameSpace.Todo).trigger(
                new Events.Todo.Add(this.view.value)
            );
            this.view.value = "";
        }
    }
}

export default NewTodoComponent;
