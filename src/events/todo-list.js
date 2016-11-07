import Flight from 'flight';

const TodoList = Flight.eventType(
    function(todos) {
        this.todos = todos;
    }
);
const TodoListRequest = Flight.eventType(
    function(state) {
        this.state = state;
    }
);
const ActiveCount = Flight.eventType(
    function(activeCount) {
        this.activeCount = activeCount;
    }
);

TodoList.Filter = Flight.eventOfType(TodoListRequest).alias('TodoList:Filter');
TodoList.Request = Flight.eventOfType(TodoListRequest).alias('TodoList:Request');
TodoList.Ready = Flight.eventOfType(TodoList).alias('TodoList:Ready');
TodoList.ActiveCount = Flight.eventOfType(ActiveCount).alias('TodoList:ActiveCount');

export default TodoList;
