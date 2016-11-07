/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _debugger = __webpack_require__(16);

	var _debugger2 = _interopRequireDefault(_debugger);

	var _todo = __webpack_require__(9);

	var _todo2 = _interopRequireDefault(_todo);

	var _todoList = __webpack_require__(12);

	var _todoList2 = _interopRequireDefault(_todoList);

	var _newTodo = __webpack_require__(14);

	var _newTodo2 = _interopRequireDefault(_newTodo);

	var _todoToolbar = __webpack_require__(15);

	var _todoToolbar2 = _interopRequireDefault(_todoToolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// this defines event pools and initiates data providers (services, repos, clients etc)
	_todo2.default.attachTo('data/todo');

	// ui elements
	// app.js
	_newTodo2.default.attachTo('#new-todo');
	_todoList2.default.attachTo('#todo-list');
	_todoToolbar2.default.attachTo('#footer');

	window.Flight = _flight2.default;
	window.Events = _events2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _eventPool = __webpack_require__(2);

	var _event = __webpack_require__(3);

	var _component = __webpack_require__(4);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Flight = {};
	exports.default = Flight;

	// eventPools

	Flight.EventPool = _eventPool.EventPool;
	Flight.DataEventPool = _eventPool.DataEventPool;
	Flight.getOrCreateEventPool = _eventPool.getOrCreateEventPool;
	Flight.detachEventPool = _eventPool.detachEventPool;

	// events

	Flight.Event = _event.Event;
	Flight.eventType = _event.eventType;
	Flight.eventOfType = _event.eventOfType;
	Flight.basicEventOf = _event.basicEventOf;

	// Component

	Flight.Component = _component2.default;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.getOrCreateEventPool = getOrCreateEventPool;
	exports.detachEventPool = detachEventPool;

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventPool = exports.EventPool = function () {
	    function EventPool() {
	        _classCallCheck(this, EventPool);
	    }

	    _createClass(EventPool, [{
	        key: 'trigger',
	        value: function trigger(flightEvent) {
	            flightEvent.originalEvent = flightEvent.event();
	            this.element.dispatchEvent(flightEvent.originalEvent);
	        }
	    }, {
	        key: 'listen',
	        value: function listen() {
	            for (var i = 0; i < arguments.length; i += 2) {
	                this.addEventListener(arguments.length <= i ? undefined : arguments[i], arguments.length <= i + 1 ? undefined : arguments[i + 1]);
	            }
	        }
	    }, {
	        key: 'addEventListener',
	        value: function addEventListener(flightEvent, eventHandler) {
	            if (typeof flightEvent == 'string') {
	                this.element.addEventListener(flightEvent, function (event) {
	                    return eventHandler(event);
	                });
	            } else {
	                this.element.addEventListener(flightEvent.EventName, function (event) {
	                    return eventHandler(event.detail);
	                });
	            }
	        }
	    }, {
	        key: '$',
	        value: function $(key) {
	            return getOrCreateEventPool(this.path + '/#' + key);
	        }
	    }], [{
	        key: 'forElement',
	        value: function forElement(element, component) {
	            var instance = new this();

	            instance.name = component && component.constructor.name;
	            instance.element = element;

	            return instance;
	        }
	    }, {
	        key: 'forComponent',
	        value: function forComponent(component) {
	            var instance = new this();

	            instance.name = component.constructor.name;
	            instance.element = component.view;

	            return instance;
	        }
	    }]);

	    return EventPool;
	}();

	var DataEventPool = exports.DataEventPool = function (_EventPool) {
	    _inherits(DataEventPool, _EventPool);

	    function DataEventPool(name, path) {
	        _classCallCheck(this, DataEventPool);

	        var _this = _possibleConstructorReturn(this, (DataEventPool.__proto__ || Object.getPrototypeOf(DataEventPool)).call(this));

	        _this.name = name;
	        _this.path = path;
	        _this.element = _this.createElement(name);
	        _this.children = {};
	        return _this;
	    }

	    _createClass(DataEventPool, [{
	        key: 'detach',
	        value: function detach() {
	            delete this.element;
	            detachEventPool(this.path);
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement(name) {
	            var idFromName = function idFromName(name) {
	                return name.replace(/[^A-Za-z0-9/]/g, '').replace(/[/]/g, '-');
	            };
	            var elementFromName = function elementFromName(name) {
	                return name[0] == '#' ? 'item' : name.toLowerCase().replace(/[^a-z0-9]/g, '');
	            };

	            var element = document.createElement(elementFromName(name));
	            element.id = idFromName(name);

	            return element;
	        }
	    }]);

	    return DataEventPool;
	}(EventPool);

	;

	var dataEventPoolRoot = new DataEventPool('data');

	function getOrCreateEventPool(path) {
	    var poolPath = path.split('/').slice(1);
	    var currentPath = 'data';
	    var eventPool = dataEventPoolRoot;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = poolPath[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var poolName = _step.value;

	            currentPath += '/' + poolName;
	            if (!eventPool.children[poolName]) {
	                var newPool = new DataEventPool(poolName, currentPath);
	                eventPool.children[poolName] = newPool;
	                eventPool.element.appendChild(newPool.element);
	            }
	            eventPool = eventPool.children[poolName];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return eventPool;
	};

	function detachEventPool(path) {
	    var poolPath = path.split('/').slice(1);
	    var eventPool = dataEventPoolRoot;
	    var poolToDelete = poolPath.pop();
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = poolPath[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var poolName = _step2.value;

	            if (!eventPool.children[poolName]) {
	                return false;
	            }
	            eventPool = eventPool.children[poolName];
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    if (eventPool.children[poolToDelete]) {
	        delete eventPool.children[poolToDelete];
	    }

	    return true;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.eventType = eventType;
	exports.eventOfType = eventOfType;
	exports.basicEvent = basicEvent;

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*******************************************************************************
	 * Event | eventType | eventOfType | basicEventOf
	 **/

	var __eventId = 0;

	var Event = function () {
	    function Event() {
	        _classCallCheck(this, Event);

	        this.name = this.constructor.EventName;
	    }

	    _createClass(Event, [{
	        key: "event",
	        value: function event() {
	            return new CustomEvent(this.name, {
	                detail: this,
	                bubbles: !this.constructor._cancelBubble,
	                cancelable: true
	            });
	        }
	    }, {
	        key: "stopPropagation",
	        value: function stopPropagation() {
	            this.originalEvent && this.originalEvent.stopPropagation();
	        }
	    }, {
	        key: "preventDefault",
	        value: function preventDefault() {
	            this.originalEvent && this.originalEvent.preventDefault();
	        }
	    }], [{
	        key: "bubbles",
	        value: function bubbles(_bubbles) {
	            this._cancelBubble = !_bubbles;
	            return this;
	        }
	    }, {
	        key: "alias",
	        value: function alias(name) {
	            this.EventName = name;
	            return this;
	        }
	    }]);

	    return Event;
	}();

	exports.Event = Event;
	function eventType(constr) {
	    var EventClass = function (_Event) {
	        _inherits(EventClass, _Event);

	        function EventClass() {
	            _classCallCheck(this, EventClass);

	            var _this = _possibleConstructorReturn(this, (EventClass.__proto__ || Object.getPrototypeOf(EventClass)).call(this));

	            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                params[_key] = arguments[_key];
	            }

	            constr.apply(_this, params);
	            return _this;
	        }

	        return EventClass;
	    }(Event);
	    return EventClass;
	};

	function eventOfType(EventType) {
	    return function (_EventType) {
	        _inherits(_class, _EventType);

	        function _class() {
	            _classCallCheck(this, _class);

	            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	        }

	        return _class;
	    }(EventType).alias("Event" + ++__eventId);
	};

	function basicEvent() {
	    return function (_Event2) {
	        _inherits(_class2, _Event2);

	        function _class2() {
	            _classCallCheck(this, _class2);

	            return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
	        }

	        return _class2;
	    }(Event).alias("Event" + ++__eventId);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventPool = __webpack_require__(2);

	var _DOM = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
	    function Component() {
	        _classCallCheck(this, Component);
	    }

	    _createClass(Component, [{
	        key: 'listen',
	        value: function listen() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            this.listen();

	            return this.view;
	        }
	    }, {
	        key: 'getOrCreateEventPool',
	        value: function getOrCreateEventPool() {
	            return this.eventPool || (this.eventPool = _eventPool.EventPool.forComponent(this));
	        }
	    }, {
	        key: 'on',
	        value: function on(path) {
	            if (path instanceof _eventPool.EventPool) {
	                return path;
	            }

	            if (!path || path == 'ui') {
	                return this.getOrCreateEventPool();
	            } else if (path.substring(0, 3) === "ui:") {
	                var element = this.view.querySelector(path.substring(3));
	                return _eventPool.EventPool.forElement(element, this);
	            }
	            return (0, _eventPool.getOrCreateEventPool)(path);
	        }
	    }, {
	        key: 'view',
	        get: function get() {
	            return this._view;
	        },
	        set: function set(element) {
	            this._view = element;
	            this.getOrCreateEventPool().element = element;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(element) {
	            element = (0, _DOM.getElement)(element);

	            var instance = new this(element);
	            instance.view = element;
	            instance.listen();

	            window.components || (window.components = []);
	            window.components.push(instance);
	        }
	    }]);

	    return Component;
	}();

	exports.default = Component;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getElement = getElement;
	function getElement(element) {
	    return typeof element == 'string' ? document.querySelector(element) : element;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _todo = __webpack_require__(7);

	var _todo2 = _interopRequireDefault(_todo);

	var _todoList = __webpack_require__(8);

	var _todoList2 = _interopRequireDefault(_todoList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Events = {};

	Events.Todo = _todo2.default;
	Events.TodoList = _todoList2.default;

	exports.default = Events;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Todo = _flight2.default.eventType(function (todo) {
	    this.todo = todo;
	});
	var AddTodo = _flight2.default.eventType(function (title) {
	    this.title = title;
	});

	Todo.Add = _flight2.default.eventOfType(AddTodo).alias('Todo:Add');
	Todo.Added = _flight2.default.eventOfType(Todo).alias('Todo:Added');

	Todo.Update = _flight2.default.eventOfType(Todo).alias('Todo:Update');
	Todo.Updated = _flight2.default.eventOfType(Todo).alias('Todo:Updated');

	Todo.Remove = _flight2.default.eventOfType(Todo).alias('Todo:Remove');
	Todo.Removed = _flight2.default.eventOfType(Todo).alias('Todo:Removed');

	exports.default = Todo;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TodoList = _flight2.default.eventType(function (todos) {
	    this.todos = todos;
	});
	var TodoListRequest = _flight2.default.eventType(function (state) {
	    this.state = state;
	});
	var ActiveCount = _flight2.default.eventType(function (activeCount) {
	    this.activeCount = activeCount;
	});

	TodoList.Filter = _flight2.default.eventOfType(TodoListRequest).alias('TodoList:Filter');
	TodoList.Request = _flight2.default.eventOfType(TodoListRequest).alias('TodoList:Request');
	TodoList.Ready = _flight2.default.eventOfType(TodoList).alias('TodoList:Ready');
	TodoList.ActiveCount = _flight2.default.eventOfType(ActiveCount).alias('TodoList:ActiveCount');

	exports.default = TodoList;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _repository = __webpack_require__(10);

	var _repository2 = _interopRequireDefault(_repository);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _todo = __webpack_require__(11);

	var _todo2 = _interopRequireDefault(_todo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TodoRepository = function (_Repository) {
	    _inherits(TodoRepository, _Repository);

	    function TodoRepository() {
	        _classCallCheck(this, TodoRepository);

	        var _this = _possibleConstructorReturn(this, (TodoRepository.__proto__ || Object.getPrototypeOf(TodoRepository)).call(this));

	        _this.todos = new Map();
	        _this._id = 1;
	        return _this;
	    }

	    _createClass(TodoRepository, [{
	        key: 'listen',
	        value: function listen() {
	            var _this2 = this;

	            this.on('data/todo').listen(_events2.default.Todo.Add, function (event) {
	                return _this2.add(event.title);
	            }, _events2.default.Todo.Update, function (event) {
	                return _this2.update(event.todo);
	            }, _events2.default.Todo.Remove, function (event) {
	                return _this2.remove(event.todo);
	            }, _events2.default.TodoList.Request, function (event) {
	                return _this2.prepareList(event);
	            });
	        }
	    }, {
	        key: 'add',
	        value: function add(title) {
	            var item = new _todo2.default({
	                title: title,
	                id: this._id++
	            });

	            this.todos.set(item.id, item);

	            this.on('data/todo').trigger(new _events2.default.Todo.Added(item));
	            this.on('data/todo').trigger(new _events2.default.TodoList.ActiveCount(this.activeCount()));
	        }
	    }, {
	        key: 'update',
	        value: function update(todo) {
	            var item = new _todo2.default(todo);
	            this.todos.set(item.id, item);
	            this.on('data/todo').$(todo.id).trigger(new _events2.default.Todo.Updated(item));
	            this.on('data/todo').trigger(new _events2.default.TodoList.ActiveCount(this.activeCount()));
	        }
	    }, {
	        key: 'remove',
	        value: function remove(todo) {
	            var item = new _todo2.default(todo);
	            this.todos.delete(todo.id);
	            this.on('data/todo').trigger(new _events2.default.Todo.Removed(item));
	            this.on('data/todo').trigger(new _events2.default.TodoList.ActiveCount(this.activeCount()));
	            this.on('data/todo').$(todo.id).detach();
	        }
	    }, {
	        key: 'prepareList',
	        value: function prepareList(requestEvent) {
	            var list = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.todos.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _step$value = _slicedToArray(_step.value, 2),
	                        k = _step$value[0],
	                        todo = _step$value[1];

	                    if (!requestEvent.state || todo.state == requestEvent.state) {
	                        list.push(todo);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            this.on('data/todo').trigger(new _events2.default.TodoList.Ready(list));
	        }
	    }, {
	        key: 'activeCount',
	        value: function activeCount() {
	            var activeCount = 0;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.todos.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _step2$value = _slicedToArray(_step2.value, 2),
	                        k = _step2$value[0],
	                        todo = _step2$value[1];

	                    if (todo.state == _todo2.default.Active) {
	                        ++activeCount;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return activeCount;
	        }
	    }]);

	    return TodoRepository;
	}(_repository2.default);

	exports.default = TodoRepository;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ = __webpack_require__(1);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Repository = function () {
	    function Repository() {
	        _classCallCheck(this, Repository);
	    }

	    _createClass(Repository, [{
	        key: 'on',
	        value: function on(path) {
	            return _2.default.getOrCreateEventPool(path);
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(eventPoolPath) {
	            var instance = new this();

	            instance.eventPool = _2.default.getOrCreateEventPool(eventPoolPath);
	            instance.listen();

	            return instance;
	        }
	    }]);

	    return Repository;
	}();

	exports.default = Repository;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Todo = function Todo(properties) {
	    _classCallCheck(this, Todo);

	    this.id = properties.id;
	    this.title = properties.title;
	    this.state = properties.state || Todo.Active;
	};

	Todo.Active = 'active';
	Todo.Completed = 'completed';

	exports.default = Todo;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	var _todoItem = __webpack_require__(13);

	var _todoItem2 = _interopRequireDefault(_todoItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TodoListComponent = function (_Flight$Component) {
	    _inherits(TodoListComponent, _Flight$Component);

	    function TodoListComponent() {
	        _classCallCheck(this, TodoListComponent);

	        var _this = _possibleConstructorReturn(this, (TodoListComponent.__proto__ || Object.getPrototypeOf(TodoListComponent)).call(this));

	        _this.state = null;
	        return _this;
	    }

	    _createClass(TodoListComponent, [{
	        key: 'listen',
	        value: function listen() {
	            var _this2 = this;

	            this.on('data/todo').listen(_events2.default.Todo.Added, function (event) {
	                return _this2.addTodo(event.todo);
	            }, _events2.default.Todo.Removed, function (event) {
	                return _this2.removeTodo(event.todo);
	            }, _events2.default.TodoList.Filter, function (event) {
	                return _this2.requestList(event.state);
	            }, _events2.default.TodoList.Ready, function (event) {
	                return _this2.showTodoList(event.todos);
	            });
	        }
	    }, {
	        key: 'addTodo',
	        value: function addTodo(todo) {
	            if (this.state && todo.state !== this.state) {
	                return;
	            }
	            var todoComponent = new _todoItem2.default(todo);
	            var newItem = document.createElement('li');
	            newItem.id = 'todo-' + todo.id;
	            newItem.appendChild(todoComponent.render());
	            this.view.appendChild(newItem);
	        }
	    }, {
	        key: 'removeTodo',
	        value: function removeTodo(todo) {
	            this.view.querySelector('#todo-' + todo.id).remove();
	        }
	    }, {
	        key: 'requestList',
	        value: function requestList(state) {
	            this.state = state;
	            this.on('data/todo').trigger(new _events2.default.TodoList.Request(state));
	        }
	    }, {
	        key: 'clearTodos',
	        value: function clearTodos() {
	            this.view.innerHTML = "";
	        }
	    }, {
	        key: 'showTodoList',
	        value: function showTodoList(todos) {
	            this.clearTodos();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = todos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var todo = _step.value;

	                    this.addTodo(todo);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return TodoListComponent;
	}(_flight2.default.Component);

	exports.default = TodoListComponent;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	var _todo = __webpack_require__(11);

	var _todo2 = _interopRequireDefault(_todo);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TodoComponent = function (_Flight$Component) {
	    _inherits(TodoComponent, _Flight$Component);

	    function TodoComponent(todo) {
	        _classCallCheck(this, TodoComponent);

	        var _this = _possibleConstructorReturn(this, (TodoComponent.__proto__ || Object.getPrototypeOf(TodoComponent)).call(this));

	        _this.todo = todo;
	        return _this;
	    }

	    _createClass(TodoComponent, [{
	        key: 'listen',
	        value: function listen() {
	            var _this2 = this;

	            this.on('data/todo/#' + this.todo.id).listen(_events2.default.Todo.Updated, function (event) {
	                return _this2.update(event.todo);
	            });
	            this.on('ui:label').listen('dblclick', function (event) {
	                return _this2.setEditMode(true);
	            });
	            this.on('ui:.edit').listen('keypress', function (event) {
	                return _this2.onEditorKeyPress(event);
	            });
	            this.on('ui:.toggle').listen('click', function (event) {
	                return _this2.toggleState(event);
	            });
	            this.on('ui:.destroy').listen('click', function (event) {
	                return _this2.destroy();
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.view = document.createElement('todo');

	            this.toggle = this.view.appendChild(document.createElement('input'));
	            this.toggle.className = "toggle";
	            this.toggle.type = "checkbox";

	            this.label = this.view.appendChild(document.createElement('label'));

	            this.remove = this.view.appendChild(document.createElement('button'));
	            this.remove.className = "destroy";

	            this.editor = this.view.appendChild(document.createElement('input'));
	            this.editor.className = "edit";
	            this.editor.type = "text";

	            this.update(this.todo);

	            return _get(TodoComponent.prototype.__proto__ || Object.getPrototypeOf(TodoComponent.prototype), 'render', this).call(this);
	        }
	    }, {
	        key: 'toggleState',
	        value: function toggleState(event) {
	            this.todo.state = this.toggle.checked ? _todo2.default.Completed : _todo2.default.Active;

	            this.on('data/todo').trigger(new _events2.default.Todo.Update(this.todo));
	        }
	    }, {
	        key: 'setEditMode',
	        value: function setEditMode(state) {
	            this.view.className = state ? 'editing' : '';
	        }
	    }, {
	        key: 'onEditorKeyPress',
	        value: function onEditorKeyPress(event) {
	            if (event.charCode == 13) {
	                this.todo.title = this.editor.value;

	                this.setEditMode(false);

	                this.on('data/todo').trigger(new _events2.default.Todo.Update(this.todo));
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(todo) {
	            this.todo = todo;
	            this.label.textContent = todo.title;
	            this.editor.value = todo.title;
	            this.toggle.checked = todo.state == _todo2.default.Completed;
	            this.view.className = todo.state;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.on('data/todo').trigger(new _events2.default.Todo.Remove(this.todo));
	        }
	    }]);

	    return TodoComponent;
	}(_flight2.default.Component);

	exports.default = TodoComponent;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewTodoComponent = function (_Flight$Component) {
	    _inherits(NewTodoComponent, _Flight$Component);

	    function NewTodoComponent() {
	        _classCallCheck(this, NewTodoComponent);

	        return _possibleConstructorReturn(this, (NewTodoComponent.__proto__ || Object.getPrototypeOf(NewTodoComponent)).apply(this, arguments));
	    }

	    _createClass(NewTodoComponent, [{
	        key: 'listen',
	        value: function listen() {
	            var _this2 = this;

	            this.on('ui').listen('keypress', function (event) {
	                return _this2.onKeyPress(event);
	            });
	        }
	    }, {
	        key: 'onKeyPress',
	        value: function onKeyPress(event) {
	            if (event.charCode == 13 && this.view.value.length) {
	                this.on('data/todo').trigger(new _events2.default.Todo.Add(this.view.value));
	                this.view.value = "";
	            }
	        }
	    }]);

	    return NewTodoComponent;
	}(_flight2.default.Component);

	exports.default = NewTodoComponent;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _flight = __webpack_require__(1);

	var _flight2 = _interopRequireDefault(_flight);

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TodoToolbarComponent = function (_Flight$Component) {
	    _inherits(TodoToolbarComponent, _Flight$Component);

	    function TodoToolbarComponent() {
	        _classCallCheck(this, TodoToolbarComponent);

	        return _possibleConstructorReturn(this, (TodoToolbarComponent.__proto__ || Object.getPrototypeOf(TodoToolbarComponent)).apply(this, arguments));
	    }

	    _createClass(TodoToolbarComponent, [{
	        key: 'listen',
	        value: function listen() {
	            var _this2 = this;

	            this.on('data/todo').listen(_events2.default.TodoList.ActiveCount, function (event) {
	                return _this2.refreshCounter(event.activeCount);
	            });
	            this.on('ui:#filters').listen('click', function (event) {
	                return _this2.filterClick(event);
	            });

	            this.counter = this.view.querySelector('#todo-count strong');
	        }
	    }, {
	        key: 'filterClick',
	        value: function filterClick(event) {
	            var state = event.srcElement.id.substring(7);
	            state == 'all' && (state = false);
	            this.on('data/todo').trigger(new _events2.default.TodoList.Filter(state));

	            this.view.querySelector('.selected').className = '';
	            event.srcElement.className = 'selected';
	        }
	    }, {
	        key: 'refreshCounter',
	        value: function refreshCounter(activeCount) {
	            this.counter.textContent = activeCount;
	        }
	    }]);

	    return TodoToolbarComponent;
	}(_flight2.default.Component);

	exports.default = TodoToolbarComponent;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _component = __webpack_require__(4);

	var _component2 = _interopRequireDefault(_component);

	var _repository = __webpack_require__(10);

	var _repository2 = _interopRequireDefault(_repository);

	var _eventPool = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var actor = null;

	// this.on()
	_component2.default.prototype.$$on = _component2.default.prototype.on;
	_component2.default.prototype.on = function (path) {
	    actor = this;
	    return this.$$on(path);
	};
	_repository2.default.prototype.$$on = _repository2.default.prototype.on;
	_repository2.default.prototype.on = function (path) {
	    actor = this;
	    return this.$$on(path);
	};

	// EventPool
	_eventPool.EventPool.prototype.$$trigger = _eventPool.EventPool.prototype.trigger;
	_eventPool.EventPool.prototype.trigger = function (flightEvent) {
	    console.log(actor.constructor.name + ' triggering ' + flightEvent.name);
	    return this.$$trigger(flightEvent);
	};

	_eventPool.EventPool.prototype.$$addEventListener = _eventPool.EventPool.prototype.addEventListener;
	_eventPool.EventPool.prototype.addEventListener = function (flightEvent, handler) {
	    var eventName = typeof flightEvent == 'string' ? flightEvent : flightEvent.EventName;
	    var boundActor = actor.constructor.name;

	    var debugHandler = function debugHandler(event) {
	        console.log(boundActor + ' listening for ' + eventName);
	        console.log(' > calling ' + boundActor + '.' + handlerToString(handler));
	        return handler(event);
	    };
	    return this.$$addEventListener(flightEvent, debugHandler);
	};

	function handlerToString(handler) {
	    if (handler.name) {
	        return handler.name;
	    }
	    return handler.toString().match(/_this[0-9][.]([^(]*)[(]/).pop();
	}

	var Debugger = {};
	exports.default = Debugger;

/***/ }
/******/ ]);