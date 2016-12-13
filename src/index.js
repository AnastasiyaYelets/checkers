import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Square from './components/square';
import Board from './components/Board/index';


const createStoreWithMiddleware = applyMiddleware()(createStore);



  ReactDOM.render(
      // <Provider store={createStoreWithMiddleware(reducers)}>
    <Board
    />
    // </Provider>
   ,document.querySelector('.container'))
