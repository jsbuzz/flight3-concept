import TodoListComponent from 'components/todo-list';

describe('TodoListComponent', () => {
    const view = document.createElement('ul');
    const component = TodoListComponent.attachTo(view);                        // this initiates listeners as well

    beforeEach(() => {
        component.clearTodos();
    });

    it("on Todo:Added event should add a new todo to the list", ()=>{
        const todo = aTodo();
        Flight.$('data/todo').trigger(new Todo.Added(todo));

        view.
    });

    it("on Todo:Removed event should remove the item from the list", ()=>{

    });

    it("on TodoList:Ready event should render the new list", ()=>{

    });
});
