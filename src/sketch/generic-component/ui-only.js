import Flight from 'flight';

// you can separate the events to a ${component-name}.events.js file
export const FilterRequestEvent = Flight.eventType(
    function(state) {
        this.state = state;
    }
).alias('TodoToolbarComponent:FilterRequest');

class TodoToolbarComponent extends Flight.Component {

    listen() {
        this.on('ui:#filters').listen(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        event.preventDefault();
        let state = event.srcElement.id.substring(7);
        state == 'all' && (state = false);
        this.interface.trigger(
            new FilterRequestEvent(state)
        );

        this.view.querySelector(`.selected`).className = '';
        event.srcElement.className = 'selected';
    }

    refreshCounter(activeCount) {
        this.counter.textContent = activeCount;
    }
}
export default TodoToolbarComponent;


// usage
this.toolbar = TodoToolbarComponent.attachTo(this.view.$.toolbar);
toolbar.on('data/todo').listen(
    Events.TodoList.ActiveCount, (event) => toolbar.refreshCounter(event.activeCount)
);

//...
this.on(this.toolbar.interface).listen(
    toolbar.interface.FilterRequestEvent, event => this.on('data/todo').trigger(
        new Events.TodoList.Request(event.state)
    ),
);
