import React,{Component} from 'react';

import store from '../reducers/store';

let nextTodoId = 0;

const AddTodo = () => {
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