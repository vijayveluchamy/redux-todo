import React,{Component} from 'react';
import { connect } from 'react-redux';

import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
                dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    }
};


const VisibileTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibileTodoList;