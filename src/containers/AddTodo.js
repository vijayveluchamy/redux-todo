import React,{ Component } from 'react';
import { connect } from 'react-redux'; 
let nextTodoId = 0;

let AddTodo = ({dispatch}) => {
    let textbox;
    return (
        <div>
            <input ref={node => {
                textbox = node;
            }} />
            <button onClick={() => {
                dispatch({
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

AddTodo = connect()(AddTodo);

export default AddTodo;