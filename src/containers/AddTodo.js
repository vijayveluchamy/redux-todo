import React,{Component} from 'react';
import PropTypes from 'prop-types';

let nextTodoId = 0;

const AddTodo = (props, {store}) => {
    let textbox;
    return (
        <div>
            <input ref={node => {
                textbox = node;
            }} />
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: textbox.value
                });
                textbox.value = '';
            }}>
                Add Todo
        </button>
        </div>
    );
};

export default AddTodo;

AddTodo.contextTypes = {
    store: PropTypes.object
}