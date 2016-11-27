
import Flight from 'flight';

Flight.Debugger.showEvents = true;
Flight.Debugger.showView = true;
// Debugger.init() has to be called before attaching repos and components (!)
Flight.Debugger.init();

// repositories
import TodoRepository from 'repositories/todo.repository';
TodoRepository.attachTo('data/todo');

// ui elements
import TodoListComponent from 'components/todo-list';
import NewTodoComponent from 'components/new-todo';
import TodoToolbarComponent from 'components/todo-toolbar';
NewTodoComponent.attachTo('#new-todo');
TodoListComponent.attachTo('#todo-list');
TodoToolbarComponent.attachTo('#footer');

window.Flight = Flight;
