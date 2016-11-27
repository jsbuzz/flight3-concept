// app.js
import Flight from 'flight';
import Events from 'events';

import Debugger from 'flight/debugger';
Debugger.showView = true;

import TodoRepository from 'repositories/todo.repository';
import TodoListComponent from 'components/todo-list';
import NewTodoComponent from 'components/new-todo';
import TodoToolbarComponent from 'components/todo-toolbar';


// this defines event pools and initiates data providers (services, repos, clients etc)
TodoRepository.attachTo('data/todo');

// ui elements
NewTodoComponent.attachTo('#new-todo');
TodoListComponent.attachTo('#todo-list');
TodoToolbarComponent.attachTo('#footer');

window.Flight = Flight;
