import TodoListComponent from 'components/todo-list';
import Todo from 'domain/todo';
import Events from 'events';

// $() should be an easy test solution to return eventPools and elements

describe('TodoListComponent', () => {
    const view = document.createElement('ul');
    const component = TodoListComponent.attachTo(view);                        // this initiates listeners as well

    beforeEach(() => {
        component.clearTodos();
    });

    it("on Todo:Added event should add a new todo to the list", ()=>{
        const title = "pass the test";
        const todo = aTodo(title);
        component.on('data/todo').trigger(new Events.Todo.Added(todo));

        let label = view.querySelector('li todo label').innerHTML.trim();
        expect(label).to.equal(title);
        // expect(view.querySelector('li todo label')).to.contain(todo.title);
    });

    // it("on Todo:Removed event should remove the item from the list", ()=>{
    //     const todo = aTodo();
    //     $('data/todo').trigger(new Events.Todo.Added(todo));
    //
    //     expect(view).to.haveElement('li todo');
    //
    //     $('data/todo').trigger(new Events.Todo.Removed(todo));
    //     expect(view).not.to.haveElement('li todo');
    // });
    //
    // it("on TodoList:Ready event should render the new list", ()=>{
    //     const todo = aTodo();
    //     $('data/todo').trigger(new Events.Todo.Added(todo));
    //
    //     const todos = [aTodo(), aTodo(), aTodo()];
    //     $('data/todo').trigger(new Events.TodoList.Ready(todos));
    //
    //     expect($('li todo', view).length).to.equal(todos.length);
    // });
});

function aTodo(title, state, id) {
    return new Todo({
        title : title || "todo",
        state : state || Todo.Active,
        id : id || 1,
    });
}
