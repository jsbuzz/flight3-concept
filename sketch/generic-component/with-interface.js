import Flight from 'flight';
import Events from 'events';

const toolbar = TodoToolbarComponent.withInterface({
    eventPools: {
        Todos: 'data/todo',
    },
    listens: {
        RefreshCounter: Events.TodoList.ActiveCount
    },
    triggers: {
        FilterRequest: Events.TodoList.Request
    }
});


class TodoToolbarComponent extends Flight.GenericComponent({
    eventPools: {
        Todos: 'data/todo',
    },
    listens: {
        RefreshCounter: Events.TodoList.ActiveCount,
    },
    triggers: {
        FilterRequest: Events.TodoList.Request,
    }
}) {

    listen() {
        this.on(this.interface.Todos).listen(
            this.interface.RefreshCounter, event => this.refreshCounter(event.activeCount),
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
        this.on(this.interface.Todos).trigger(
            new this.interface.FilterRequest(state)
        );

        this.view.querySelector(`.selected`).className = '';
        event.srcElement.className = 'selected';
    }

    refreshCounter(activeCount) {
        this.counter.textContent = activeCount;
    }
}

export default TodoToolbarComponent;
