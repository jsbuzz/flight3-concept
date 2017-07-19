
import Flight from 'flight';
import TodoRepository from 'repositories/todo.repository';
import TodoListComponent from 'components/todo-list';
import NewTodoComponent from 'components/new-todo';
import TodoToolbarComponent from 'components/todo-toolbar';

// Debugger
Flight.Debugger.showEvents = true;
Flight.Debugger.showView = true;
Flight.Debugger.init();

Flight.app(() => {
    // repositories
    TodoRepository.attachTo('data/todo');

    // ui elements
    NewTodoComponent.attachTo('#new-todo');
    TodoListComponent.attachTo('#todo-list');
    TodoToolbarComponent.attachTo('#footer');
});

window.Flight = Flight;
