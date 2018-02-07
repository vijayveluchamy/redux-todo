import React,{Component} from 'react';
import Redux,{createStore, combineReducers} from 'redux';
import ReactDOM from 'react-dom';

const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id === action.id) {
                return Object.assign({}, state, {
                    completed: !state.completed
                });
            } else {
                return state;
            }
        default:
            return state;
    };
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    };

};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
}

const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

let nextTodoId = 0;

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={(e) => {
                e.preventDefault();
                onClick(filter);
            }}
        >
            {children}
        </a>
    )
};

const Footer = ({ visibilityFilter, onFilterClick }) => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink
                filter='SHOW_ALL'
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                All
            </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_ACTIVE'
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                Active
            </FilterLink>
            {' '}
            <FilterLink
                filter='SHOW_COMPLETED'
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                Completed
            </FilterLink>
        </p>
    );
};
const Todo = ({ onClick, completed, text }) => {
    return (
        <li key={todo.id}
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}>
            {text}
        </li>
    );
};

const TodoList = ({ todos, onTodoClick }) => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onTodoClick(todo.id)}
                />
            )}
        </ul>
    );
};

const AddTodo = ({ onAddClick }) => {
    let textbox;
    return (
        <div>
            <input ref={node => {
                textbox = node;
            }} />
            <button onClick={() => {
                onAddClick(textbox.value);
                textbox.value = '';
            }}>
                Add Todo
        </button>
        </div>
    );
};



export default class TodoApp extends Component {
    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <AddTodo
                    onAddClick={(txtVal) =>
                        store.dispatch({
                            type: 'ADD_TODO',
                            id: nextTodoId++,
                            text: txtVal
                        })
                    }
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={id =>
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                    }
                />
                <Footer
                    visibilityFilter={visibilityFilter}
                    onFilterClick={filter =>
                        store.dispatch({
                            type: 'SET_VISIBILITY_FILTER',
                            filter
                        })
                    }
                />
            </div>
        );
    }
};

const render = () => {
    ReactDOM.render(
        <TodoApp
            {...store.getState() }
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();