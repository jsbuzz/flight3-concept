import Flight from 'flight';
import Events from 'events';
import EventChannels from 'events/channels';

class TodoToolbarComponent extends Flight.Component {

    listen() {
        EventChannels.Todo.listen(
            Events.TodoList.ActiveCount, event => this.refreshCounter(event.activeCount),
        );
        this.on('ui:#filters').listen(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        let state = event.srcElement.id.substring(7);
        state == 'all' && (state = false);
        EventChannels.Todo.trigger(
            new Events.TodoList.Request(state)
        );

        this.view.querySelector(`.selected`).className = '';
        event.srcElement.className = 'selected';
    }

    refreshCounter(activeCount) {
        this.counter.textContent = activeCount;
    }
}

export default TodoToolbarComponent;
