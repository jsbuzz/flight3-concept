class Todo {
    constructor(properties) {
        this.id = properties.id;
        this.title = properties.title;
        this.state = properties.state || Todo.Active;
    }

    get completed() {
        return this.state == Todo.Completed;
    }
}
Todo.Active = 'active';
Todo.Completed = 'completed';

export default Todo;
