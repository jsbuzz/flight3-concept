import Flight from 'flight';
import Events from 'events';

class TodoToolbarComponent extends Flight.Component {

    listen() {
        this.on('data/todo').listen(
            Events.TodoList.ActiveCount, event => this.refreshCounter(event.activeCount),
        );
        this.on('ui:#filters').listen(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        event.preventDefault();
        let state = event.srcElement.id.substring(7);
        state == 'all' && (state = false);
        this.on('data/todo').trigger(
            new Events.TodoList.Filter(state)
        );

        this.view.querySelector(`.selected`).className = '';
        event.srcElement.className = 'selected';
    }

    refreshCounter(activeCount) {
        this.counter.textContent = activeCount;
    }
}

export default TodoToolbarComponent;
