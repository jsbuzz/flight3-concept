import Flight from 'flight';
import Events from 'events';

class TodoToolbarComponent extends Flight.Component {

    listen() {
        this.events('data/todo').on(
            Events.TodoList.ActiveCount, event => this.refreshCounter(event.activeCount),
        );
        this.events('ui:#filters').on(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        if(event.srcElement.className == 'selected') {
            return ;
        }

        let state = event.srcElement.id.substring(7);
        state == 'all' && (state = false);
        this.events('data/todo').trigger(
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
