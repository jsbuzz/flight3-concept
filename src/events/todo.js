import Flight from 'flight';

const Todo = Flight.eventType(
    function(todo) {
        this.todo = todo;
    }
);
const AddTodo = Flight.eventType(
    function(title) {
        this.title = title;
    }
);


Todo.Add = Flight.eventOfType(AddTodo).alias('Todo:Add');
Todo.Added = Flight.eventOfType(Todo).alias('Todo:Added');

Todo.Update = Flight.eventOfType(Todo).alias('Todo:Update');
Todo.Updated = Flight.eventOfType(Todo).alias('Todo:Updated');

Todo.Remove = Flight.eventOfType(Todo).alias('Todo:Remove');
Todo.Removed = Flight.eventOfType(Todo).alias('Todo:Removed');

export default Todo;
