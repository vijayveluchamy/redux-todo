import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './containers/TodoApp';

const render = () => {
    ReactDOM.render(
        <TodoApp/>,
        document.getElementById('root')
    );
};

//store.subscribe(render);
render();