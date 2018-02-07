import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRedux, {Provider} from 'react-redux';

import TodoApp from './containers/TodoApp';

import store from './reducers/store';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <TodoApp />
        </Provider>,    
        document.getElementById('root')
    );
};

//store.subscribe(render);
render();